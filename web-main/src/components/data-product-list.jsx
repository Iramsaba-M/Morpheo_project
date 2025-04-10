import { DataProductCard } from "@/components/data-product-card";

export const DataProductList = () => {
  return (
    <div className="min-w-96 flex flex-col gap-3 p-2">
      <span className="text-2xl font-bold">Data Products</span>
      <DataProductCard />
    </div>
  );
};
