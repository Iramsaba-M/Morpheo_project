import { useGraph } from "@/contexts/graph-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Entity } from "@/components/graphs/entity";
import { System } from "@/components/graphs/system";
import { Domain } from "@/components/graphs/domain";
import { Box, Boxes, File } from "lucide-react";
import { useState, useEffect } from "react";
import { DefaultService } from "@/api/generated/services/DefaultService";

export const GraphContainer = () => {
  const { graphData, isLoading } = useGraph();
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [domainData, setDomainData] = useState(null);
  const [entityData, setEntityData] = useState(null);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [activeTab, setActiveTab] = useState("systems");

  // Handle system click
  const handleSystemClick = async (systemId) => {
    setSelectedSystem(systemId);
    setSelectedDomain(null);
    setEntityData(null); // Clear entity data when system changes
    setIsLoadingRelated(true);
    try {
      const response = await DefaultService.getApiDomainsSystemId(systemId);
      // Transform the response data to match the expected format
      const transformedDomains = response.data.map(item => ({
        data: {
          ...item.data,
          // Add any additional properties needed for the graph
          width: 60,
          height: 60,
        }
      }));
      setDomainData(transformedDomains);
      // Switch to domains tab
      setActiveTab("domains");
    } catch (error) {
      console.error("Error fetching domains:", error);
      setDomainData(null); // Clear domain data on error
    }
    setIsLoadingRelated(false);
  };

  // Handle domain click
  const handleDomainClick = async (domainId) => {
    setSelectedDomain(domainId);
    setIsLoadingRelated(true);
    try {
      const response = await DefaultService.postApiGraphEntitiesFilter({
        systemId: selectedSystem,
        domainId: domainId
      });
      // Transform the response data to match the expected format
      const transformedEntities = response.data.map(item => ({
        data: {
          ...item.data,
          // Add any additional properties needed for the graph
          width: 60,
          height: 60,
        }
      }));
      setEntityData(transformedEntities);
      // Switch to entities tab
      setActiveTab("entities");
    } catch (error) {
      console.error("Error fetching entities:", error);
      setEntityData(null); // Clear entity data on error
    }
    setIsLoadingRelated(false);
  };

  // Add the loading spinner here
  if (isLoading || isLoadingRelated) {
    console.log("loading graph screen");
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            src="/images/morpheo-logo-spinnable.svg"
            className="animate-spin h-10 w-10 text-gray-500"
          />
          <span className="text-muted-foreground text-sm">
            Gathering data...
          </span>
        </div>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col h-full p-2">
      <div className="flex-grow overflow-hidden">
        <TabsContent value="systems" className="h-full">
          {graphData && graphData["system"] && (
            <System
              elements={graphData["system"]}
              onNodeClick={handleSystemClick}
              selectedNode={selectedSystem}
            />
          )}
        </TabsContent>
        <TabsContent value="domains" className="h-full">
          {selectedSystem ? (
            domainData && domainData.length > 0 ? (
              <Domain
                elements={domainData}
                onNodeClick={handleDomainClick}
                selectedNode={selectedDomain}
                centerNode={selectedSystem}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-muted-foreground">
                  No domains found for the selected system
                </span>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-muted-foreground">
                Please select a system first
              </span>
            </div>
          )}
        </TabsContent>
        <TabsContent value="entities" className="h-full">
          {selectedDomain ? (
            entityData && entityData.length > 0 ? (
              <Entity
                elements={entityData}
                onNodeClick={handleDomainClick}
                selectedNode={selectedDomain}
                centerNode={selectedDomain}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-muted-foreground">
                  No entities found for the selected domain
                </span>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-muted-foreground">
                Please select a domain first
              </span>
            </div>
          )}
        </TabsContent>
      </div>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="systems">
          <Boxes className="h-5 mr-2" />
          System(s)
        </TabsTrigger>
        <TabsTrigger value="domains">
          <Box className="h-5 mr-2" />
          Domain(s)
        </TabsTrigger>
        <TabsTrigger value="entities">
          <File className="h-5 mr-2" />
          Entities
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
