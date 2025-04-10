import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { OpenAPI } from "@/api/generated";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [customUser, setCustomUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    user: auth0User,
    isLoading: isAuth0Loading,
    isAuthenticated: isAuth0Authenticated,
    getAccessTokenSilently,
    logout: auth0Logout,
  } = useAuth0();
  const memoizedGetAccessToken = useCallback(
    () => getAccessTokenSilently(),
    [getAccessTokenSilently],
  );

  const domain = window.RUNTIME_ENV.REACT_APP_AUTH0_DOMAIN;
  const clientId = window.RUNTIME_ENV.REACT_APP_AUTH0_CLIENT_ID;
  const apiEndpoint = window.RUNTIME_ENV.API_BASE_URL;
  const logoutURL = window.RUNTIME_ENV.REACT_APP_AUTH0_LOGOUT_URL;

  const loginDirect = async (username, password) => {
    try {
      const response = await fetch(`https://${domain}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "password",
          username,
          password,
          client_id: clientId,
          audience: "https://app.morpheo.ai/api",
          scope: "openid profile email",
        }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const decodedIdToken = jwtDecode(data.id_token);

      setToken(data.access_token);
      setCustomUser(decodedIdToken);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id_token", data.id_token);

      return true;
    } catch (error) {
      console.error("Error during custom login:", error);
      return false;
    }
  };

  const logoutDirect = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
  };

  useEffect(() => {
    const syncAuthState = async () => {
      try {
        if (isAuth0Authenticated) {
          const auth0Token = await memoizedGetAccessToken();

          if (token !== auth0Token) {
            setToken(auth0Token);
          }
        } else {
          const access_token = localStorage.getItem("access_token");
          const id_token = localStorage.getItem("id_token");

          if (access_token && id_token) {
            const decodedIdToken = jwtDecode(id_token);

            if (token !== access_token) {
              setToken(access_token);
            }

            if (JSON.stringify(customUser) !== JSON.stringify(decodedIdToken)) {
              setCustomUser(decodedIdToken);
            }
          }
        }

        if (OpenAPI.TOKEN !== token || OpenAPI.BASE !== apiEndpoint) {
          OpenAPI.TOKEN = token;
          OpenAPI.BASE = apiEndpoint;
        }

        const newIsAuthenticated = isAuth0Authenticated || customUser !== null;
        if (isAuthenticated !== newIsAuthenticated) {
          setIsAuthenticated(newIsAuthenticated);
        }

        setIsAuthLoading(isAuth0Loading);
      } catch (error) {
        console.error("Error syncing auth state:", error);
      }
    };

    syncAuthState();
  }, [
    memoizedGetAccessToken,
    isAuth0Authenticated,
    customUser,
    token,
    isAuthenticated,
    apiEndpoint,
    isAuth0Loading,
  ]);

  const contextValue = {
    user: auth0User || customUser,
    token,
    isAuthenticated,
    isAuthLoading,
    loginDirect,
    logout: () => {
      logoutDirect();
      auth0Logout({ logoutParams: { returnTo: logoutURL } });
    },
    openApiConfig: { token, base: apiEndpoint },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
