import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGraph } from "@/contexts/graph-provider";
import { useConversation } from "@/contexts/conversation-provider";
import { useDataProducts } from "@/contexts/data-product-provider";
import { Chat } from "@/components/chat";
import { DataProductDetail } from "@/components/data-product-detail";
import { DataProductCard } from "@/components/data-product-card";

export const DataProduct = () => {
  const { dataProduct, dataProducts } = useDataProducts();
  const [cachedGraphId, setCachedGraphId] = useState(null);
  const { graphId } = useGraph();
  const navigate = useNavigate();
  const { conversationId } = useConversation();

  useEffect(() => {
    console.log(dataProducts);
    if (!cachedGraphId) {
      setCachedGraphId(graphId);
    } else {
      if (graphId !== cachedGraphId) {
        setCachedGraphId(graphId);
        navigate("/conversations/" + conversationId);
      }
    }
  }, [graphId, conversationId, cachedGraphId, navigate, setCachedGraphId]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="min-w-96 w-96 max-w-md overflow-y-auto min-h-full pb-16">
        <Chat />
      </div>
      <div className="gap-4 flex flex-col flex-1 w-full pt-4 mr-2">
        {dataProduct && <DataProductDetail />}
        {!dataProduct &&
          dataProducts.map((item) => (
            <DataProductCard key={item.id} data_product={item} />
          ))}
      </div>
    </div>
  );
};
