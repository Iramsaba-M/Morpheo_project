import { createContext, useContext, useState, useEffect } from "react";
import { DefaultService } from "@/api/generated/services/DefaultService";
import { useAuth } from "@/contexts/auth-provider";
import { OpenAPI } from "@/api/generated";

const DataProductsContext = createContext(null);

export const DataProductsProvider = ({ children }) => {
  const [dataProducts, setDataProducts] = useState([]);
  const [dataProduct, setDataProduct] = useState(null);
  const { isAuthenticated, openApiConfig } = useAuth();

  useEffect(() => {
    console.log("data-products-provider useEffect");
    const getDataProducts = async () => {
      try {
        console.log("getDataProducts");
        // This is a hack, react timing is annoying
        OpenAPI.TOKEN = openApiConfig.token;
        OpenAPI.BASE = openApiConfig.base;

        const resp = await DefaultService.retrieveDataProducts();
        setDataProducts(resp);
        console.log(resp);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    if (isAuthenticated && openApiConfig.token) {
      getDataProducts();
    }
  }, [isAuthenticated, openApiConfig]);

  const buildDataProduct = async (product_id) => {
    try {
      await DefaultService.updateDataProduct(product_id, {
        action: "rebuild",
      });

      // If no error, then reload the systems
      const all_resp = await DefaultService.retrieveDataProducts();
      setDataProducts(all_resp);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const selectDataProduct = async (data_product_id) => {
    try {
      // This is a hack, react timing is annoying
      OpenAPI.TOKEN = openApiConfig.token;
      OpenAPI.BASE = openApiConfig.base;

      const resp = await DefaultService.retrieveDataProduct(data_product_id);
      setDataProduct(resp);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const dismissDataProduct = async () => {
    setDataProduct(null);
  };

  const contextValue = {
    dataProducts,
    dataProduct,
    selectDataProduct,
    dismissDataProduct,
    buildDataProduct,
  };

  return (
    <DataProductsContext.Provider value={contextValue}>
      {children}
    </DataProductsContext.Provider>
  );
};

export const useDataProducts = () => {
  const context = useContext(DataProductsContext);
  if (!context) {
    throw new Error(
      "useDataProducts must be used within a DataProductsContext",
    );
  }
  return context;
};
