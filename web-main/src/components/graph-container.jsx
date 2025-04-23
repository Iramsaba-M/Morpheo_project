import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { System } from "./graphs/system";
import { Domain } from "./graphs/domain";
import { Entity } from "./graphs/entity";
import { useGraph } from "@/contexts/graph-provider";
import { useSystems } from "@/contexts/systems-provider";
import { useDataProducts } from "@/contexts/data-product-provider";
import { useConversation } from "@/contexts/conversation-provider";
import { DefaultService } from "@/api/generated/services/DefaultService";

export const GraphContainer = () => {
  const { graphData, setGraphData } = useGraph();
  const { selectedSystems, setSelectedSystems } = useSystems();
  const { selectedDataProduct } = useDataProducts();
  const { selectedConversation } = useConversation();
  const [activeTab, setActiveTab] = useState("system");
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [domainData, setDomainData] = useState(null);
  const [entityData, setEntityData] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await DefaultService.getApiGraph(selectedConversation?.id);
        setGraphData(response);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    if (selectedConversation?.id) {
      fetchGraphData();
    }
  }, [selectedConversation?.id, setGraphData]);

  useEffect(() => {
    const fetchDomains = async () => {
      if (selectedNodes.length > 0) {
        try {
          const response = await DefaultService.postApiGraphDomainsBatchDomains({
            systemIds: selectedNodes
          });
          setDomainData(response.data);
        } catch (error) {
          console.error("Error fetching domains:", error);
          setDomainData(null);
        }
      } else {
        setDomainData(null);
        setSelectedDomains([]);
      }
    };

    fetchDomains();
  }, [selectedNodes]);

  useEffect(() => {
    const fetchEntities = async () => {
      if (selectedDomains.length > 0) {
        try {
          const response = await DefaultService.postApiGraphEntitiesByDomains({
            domainIds: selectedDomains
          });
          setEntityData(response.data);
        } catch (error) {
          console.error("Error fetching entities:", error);
          setEntityData(null);
        }
      } else {
        setEntityData(null);
      }
    };

    fetchEntities();
  }, [selectedDomains]);

  const handleSystemNodeClick = (nodeId) => {
    setSelectedNodes(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        return [...prev, nodeId];
      }
    });
  };

  const handleDomainNodeClick = (nodeId) => {
    setSelectedDomains(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        return [...prev, nodeId];
      }
    });
  };

  const getGraphElements = (type) => {
    if (!graphData) return [];

    // If graphData is an object with type keys
    if (typeof graphData === 'object' && !Array.isArray(graphData)) {
      return graphData[type] || [];
    }

    // If graphData is an array of graph objects
    if (Array.isArray(graphData)) {
      const graph = graphData.find((item) => item.graphType === type);
      return graph?.data || [];
    }

    return [];
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col h-full p-2">
      <div className="flex-grow overflow-hidden">
        <TabsContent value="system" className="h-full">
          <System
            elements={getGraphElements("system")}
            onNodeClick={handleSystemNodeClick}
            selectedNodes={selectedNodes}
          />
        </TabsContent>
        <TabsContent value="domain" className="h-full">
  {selectedNodes.length > 0 ? (
    Array.isArray(domainData) ? (
      <Domain
        elements={domainData}
        onNodeClick={handleDomainNodeClick}
        selectedNodes={selectedDomains}
      />
    ) : (
      <div className="flex justify-center items-center h-full">
        <span className="text-muted-foreground">
          No domains found for the selected systems
        </span>
      </div>
    )
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="text-muted-foreground">
        Please select at least one system
      </span>
    </div>
  )}
</TabsContent>

        <TabsContent value="entity" className="h-full">
          {selectedDomains.length > 0 ? (
            entityData ? (
              <Entity
                elements={entityData}
                selectedNode={null}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-muted-foreground">
                  No entities found for the selected domains
                </span>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-muted-foreground">
                Please select at least one domain
              </span>
            </div>
          )}
        </TabsContent>
      </div>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="system">System</TabsTrigger>
        <TabsTrigger value="domain">Domain</TabsTrigger>
        <TabsTrigger value="entity">Entity</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
