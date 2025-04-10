import { useGraph } from "@/contexts/graph-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Entity } from "@/components/graphs/entity";
import { System } from "@/components/graphs/system";
import { Domain } from "@/components/graphs/domain";
import { Box, Boxes, File } from "lucide-react";

export const GraphContainer = () => {
  const { graphData, isLoading } = useGraph();

  // Add the loading spinner here
  if (isLoading) {
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
            <System elements={graphData["system"]} />
          )}
        </TabsContent>
        <TabsContent value="domains" className="h-full">
          {graphData && graphData["domain"] && (
            <Domain elements={graphData["domain"]} />
          )}
        </TabsContent>
        <TabsContent value="entities" className="h-full">
          {graphData && graphData["entity"] && (
            <Entity elements={graphData["entity"]} />
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
