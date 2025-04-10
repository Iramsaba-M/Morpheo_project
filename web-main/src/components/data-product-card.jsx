import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { DataProductImage } from "@/components/data-product-image";
import { useDataProducts } from "@/contexts/data-product-provider";

const templateDataProduct = {
  title: "Customer Interactions",
  last_updated: "01/02/2025",
  owner: "Alden Grey",
  steward: "Sienna Harper",
  use_cases: 23,
  quality: 95,
  status: "Ready",
};

export const DataProductCard = ({ data_product = templateDataProduct }) => {
  const { selectDataProduct } = useDataProducts();

  const handleClick = (id) => {
    selectDataProduct(id);
  };

  return (
    <Card className="min-w-96 rounded-md">
      <CardHeader className="flex flex-row justify-between w-full p-3">
        <div className="flex-1 flex flex-row items-middle">
          <DataProductImage />
          <div className="pl-3 flex flex-col">
            <span
              className="text-lg font-bold"
              onClick={() => handleClick(data_product.id)}
            >
              {data_product.name}
            </span>
            <span className="text-sm">Last Updated: 01/02/2025</span>
          </div>
        </div>
        <div className="flex flex-row">
          <Badge
            variant="outline"
            className="h-4 flex self-center rounded-full px-4 py-3"
          >
            Quality: {data_product.qualityScore}%
          </Badge>
          <Badge className="h-4 flex self-center rounded-full px-4 py-3 border-0 ml-1">
            {data_product.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row gap-6 pl-11">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {data_product.dataOwner}
          </span>
          <span className="text-xs">Owner</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {data_product.dataSteward}
          </span>
          <span className="text-xs">Steward</span>
        </div>
        <div className="flex flex-row">
          <Layers className="text-primary pr-2 text-2xl" />
          <div className="flex flex-col">
            <span className="text-sm">{data_product.useCases.length}</span>
            <span className="text-xs"># of Use Cases</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
