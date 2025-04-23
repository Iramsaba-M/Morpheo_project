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
        if (!resp || !resp.data) {
          console.error("Invalid response format:", resp);
          return;
        }

        // Transform the data into Cytoscape format
        const transformedData = resp.data.map(item => {
          if (!item.data) {
            console.error("Invalid item format:", item);
            return null;
          }
          return {
            data: {
              id: item.data.id || '',
              label: item.data.label || '',
              icon: item.data.icon || 'default',
              type: item.data.type || ''
            }
          };
        }).filter(Boolean); // Remove any null items

        if (transformedData.length === 0) {
          console.error("No valid data items found");
          return;
        }

        setGraphData({ [resp.graphType]: transformedData });
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (graphId !== null) {
      getGraphData();
    }
  }, [graphId]);

  const loadGraph = async (new_graph_id) => {
    if (graphId === new_graph_id) {
      setIsLoading(true);
      try {
        const resp = await DefaultService.getApiGraphId(graphId);
        if (!resp || !resp.data) {
          console.error("Invalid response format:", resp);
          return;
        }

        // Transform the data into Cytoscape format
        const transformedData = resp.data.map(item => {
          if (!item.data) {
            console.error("Invalid item format:", item);
            return null;
          }
          return {
            data: {
              id: item.data.id || '',
              label: item.data.label || '',
              icon: item.data.icon || 'default',
              type: item.data.type || ''
            }
          };
        }).filter(Boolean); // Remove any null items

        if (transformedData.length === 0) {
          console.error("No valid data items found");
          return;
        }

        setGraphData({ [resp.graphType]: transformedData });
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setGraphId(new_graph_id);
    }
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
