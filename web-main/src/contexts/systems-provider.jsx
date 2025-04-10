import { createContext, useContext, useState, useEffect } from "react";
import { DefaultService } from "@/api/generated/services/DefaultService";
import { useAuth } from "@/contexts/auth-provider";
import { OpenAPI } from "@/api/generated";

const SystemsContext = createContext(null);

export const SystemsProvider = ({ children }) => {
  const [systems, setSystems] = useState([]);
  const [system, setSystem] = useState(null);
  const { isAuthenticated, openApiConfig } = useAuth();

  useEffect(() => {
    const getSystemData = async () => {
      try {
        // This is a hack, react timing is annoying
        OpenAPI.TOKEN = openApiConfig.token;
        OpenAPI.BASE = openApiConfig.base;

        const resp = await DefaultService.retrieveSourceSystems();
        setSystems(resp);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    if (isAuthenticated && openApiConfig.token) {
      getSystemData();
    }
  }, [isAuthenticated, openApiConfig]);

  const trainSystem = async (system_id) => {
    try {
      await DefaultService.updateSourceSystem(system_id, {
        action: "train",
      });

      // If no error, then reload the systems
      const all_resp = await DefaultService.retrieveSourceSystems();
      setSystems(all_resp);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const removeSystem = async (system_id) => {
    try {
      await DefaultService.updateSourceSystem(system_id, {
        action: "remove",
      });

      // If no error, then reload the systems
      const all_resp = await DefaultService.retrieveSourceSystems();
      setSystems(all_resp);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const selectSystem = async (system_id) => {
    const sys = systems.find((e) => e.id === system_id);
    setSystem(sys);
  };

  const dismissSystem = async () => {
    setSystem(null);
  };

  const contextValue = {
    systems,
    system,
    selectSystem,
    dismissSystem,
    trainSystem,
    removeSystem,
  };

  return (
    <SystemsContext.Provider value={contextValue}>
      {children}
    </SystemsContext.Provider>
  );
};

export const useSystems = () => {
  const context = useContext(SystemsContext);
  if (!context) {
    throw new Error("useSystems must be used within a SystemsProvider");
  }
  return context;
};
