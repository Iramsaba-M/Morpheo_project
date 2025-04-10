import { useState, useEffect } from "react";
import { AdminSystemTile } from "@/components/admin-system-tile";
import { Chat } from "@/components/chat";
import { useSystems } from "@/contexts/systems-provider";
import { useGraph } from "@/contexts/graph-provider";
import { AdminSystem } from "@/components/admin-system";
import { useNavigate } from "react-router";
import { useConversation } from "@/contexts/conversation-provider";

export const Catalog = () => {
  const { system, systems } = useSystems();
  const [cachedGraphId, setCachedGraphId] = useState(null);
  const { graphId } = useGraph();
  const navigate = useNavigate();
  const { conversationId } = useConversation();

  useEffect(() => {
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
      <div className="gap-4 flex flex-row flex-wrap flex-start w-full pt-4 overflow-y-auto pb-16">
        {system && <AdminSystem />}
        {!system &&
          systems.map((item) => (
            <AdminSystemTile key={item.id} system={item} />
          ))}
      </div>
    </div>
  );
};
