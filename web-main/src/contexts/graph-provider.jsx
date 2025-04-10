import { createContext, useContext, useState, useEffect } from "react";
import { DefaultService } from "@/api/generated/services/DefaultService";

const GraphContext = createContext(null);

export const GraphProvider = ({ children }) => {
  const [graphId, setGraphId] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getGraphData = async () => {
      try {
        setIsLoading(true);
        const resp = await DefaultService.getApiGraphId(graphId);
        const hashMap = resp.reduce((result, item) => {
          return { ...result, [item.graphType]: item.data };
        }, {});
        setGraphData(hashMap);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    if (graphId !== null) {
      getGraphData();
      setIsLoading(false);
    }
  }, [graphId]);

  const loadGraph = async (new_graph_id) => {
    if (graphId === new_graph_id) {
      setIsLoading(true);
      try {
        const resp = await DefaultService.getApiGraphId(graphId);
        const hashMap = resp.reduce((result, item) => {
          return { ...result, [item.graphType]: item.data };
        }, {});
        setGraphData(hashMap);
      } catch (error) {
        console.error("API error:", error);
      }
    } else {
      setGraphId(new_graph_id);
    }

    setIsLoading(false);
  };

  const contextValue = {
    graphId,
    loadGraph,
    setGraphId,
    graphData,
    isLoading,
  };

  return (
    <GraphContext.Provider value={contextValue}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
};
