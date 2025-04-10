import { Auth0Provider } from "@auth0/auth0-react";

export const Auth0NavProvider = ({ children }) => {
  const domain = window.RUNTIME_ENV.REACT_APP_AUTH0_DOMAIN;
  const clientId = window.RUNTIME_ENV.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = window.RUNTIME_ENV.REACT_APP_AUTH0_CALLBACK_URL;

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: "https://app.morpheo.ai/api",
        scope: "openid profile email",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
