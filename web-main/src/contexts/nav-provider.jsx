import { createContext, useContext, useState, useEffect } from "react";
import { DefaultService } from "@/api/generated/services/DefaultService";
import { useAuth } from "@/contexts/auth-provider";
import { OpenAPI } from "@/api/generated";

const NavContext = createContext(null);

export const NavProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const { isAuthenticated, openApiConfig } = useAuth();

  useEffect(() => {
    const getConversations = async () => {
      try {
        // This is a hack, react timing is annoying
        OpenAPI.TOKEN = openApiConfig.token;
        OpenAPI.BASE = openApiConfig.base;

        const resp = await DefaultService.getApiConversations();
        setConversations(resp);
      } catch (error) {
        console.log("API error: ", error);
      }
    };

    if (isAuthenticated && openApiConfig.token) {
      getConversations();
    }
  }, [isAuthenticated, openApiConfig]);

  const contextValue = {
    conversations,
  };

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
