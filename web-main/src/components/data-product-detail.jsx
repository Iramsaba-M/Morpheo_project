import {
  Database,
  RefreshCw,
  Edit,
  Boxes,
  Box,
  File,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataProductGraph } from "./graphs/data-product-graph";
import { useDataProducts } from "@/contexts/data-product-provider";

export const DataProductDetail = () => {
  const { dataProduct, buildDataProduct } = useDataProducts();

  const handleRebuild = (product_id) => {
    buildDataProduct(product_id);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Card className="min-w-96 w-full rounded-md">
        <CardHeader className="flex flex-row justify-between w-full p-4">
          <div className="flex-1 flex flex-row justify-around">
            <div className="flex flex-row w-full items-center">
              <span className="text-lg font-bold pr-2">{dataProduct.name}</span>
              <Badge className="h-4 flex self-center rounded-full px-4 py-3 border-0 ml-1">
                {dataProduct.status}
              </Badge>
            </div>
            <div className="flex flex-row gap-1">
              <Button variant="outline" className="text-xs">
                <Database />
                Visualize Data
              </Button>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => handleRebuild(dataProduct.id)}
              >
                <RefreshCw />
              </Button>
              <Button variant="outline" className="text-xs">
                <Edit />
              </Button>
              <Button variant="outline" className="text-xs">
                <ChevronDown />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row w-full">
          <Tabs
            defaultValue="quality"
            variant="outline"
            className="w-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quality">
                Quality ({dataProduct.qualityScore})
              </TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
              <TabsTrigger value="steward">Steward</TabsTrigger>
              <TabsTrigger value="usecases">Use Cases (2)</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex-1 flex flex-col h-full">
        <Tabs defaultValue="systems" className="flex flex-col h-full">
          <div className="flex-1 relative">
            <div className="absolute inset-0 overflow-hidden">
              <TabsContent value="systems" className="h-full">
                <DataProductGraph graph={dataProduct.graphs[0]} />
              </TabsContent>
              <TabsContent value="domains" className="h-full">
                <DataProductGraph graph={dataProduct.graphs[1]} />
              </TabsContent>
              <TabsContent value="entities" className="h-full">
                <DataProductGraph graph={dataProduct.graphs[2]} />
              </TabsContent>
            </div>
          </div>

          <TabsList className="grid w-full grid-cols-3 m-2">
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
      </div>
    </div>
  );
};

export default DataProductDetail;
