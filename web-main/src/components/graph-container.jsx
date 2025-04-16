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

  // Handle system click
  const handleSystemClick = async (systemId) => {
    setSelectedSystem(systemId);
    setSelectedDomain(null);
    setIsLoadingRelated(true);
    try {
      const response = await DefaultService.getApiDomainsSystemId(systemId);
      setDomainData(response.domains);
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
    setIsLoadingRelated(false);
  };

  // Handle domain click
  const handleDomainClick = async (domainId) => {
    setSelectedDomain(domainId);
    setIsLoadingRelated(true);
    try {
      const response = await DefaultService.getApiGraphEntitiesDomain();
      // Filter entities for the selected domain
      const filteredEntities = response.entities.filter(
        (entity) => entity.domainId === domainId
      );
      setEntityData(filteredEntities);
    } catch (error) {
      console.error("Error fetching entities:", error);
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
    <Tabs defaultValue="systems" className="w-full flex flex-col h-full p-2">
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
          {domainData ? (
            <Domain
              elements={domainData}
              onNodeClick={handleDomainClick}
              selectedNode={selectedDomain}
              centerNode={selectedSystem}
            />
          ) : (
            graphData && graphData["domain"] && (
              <Domain
                elements={graphData["domain"]}
                onNodeClick={handleDomainClick}
                selectedNode={selectedDomain}
              />
            )
          )}
        </TabsContent>
        <TabsContent value="entities" className="h-full">
          {entityData ? (
            <Entity elements={entityData} />
          ) : (
            graphData && graphData["entity"] && (
              <Entity elements={graphData["entity"]} />
            )
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
