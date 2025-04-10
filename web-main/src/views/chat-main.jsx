import { useState, useEffect } from "react";
import { Chat } from "@/components/chat";
import { GraphContainer } from "@/components/graph-container";
import { useGraph } from "@/contexts/graph-provider";

export const ChatMain = () => {
  const { graphData, isLoading } = useGraph();
  const [isRightDivVisible, setRightDivVisible] = useState(false);

  const toggleRightDivOff = () => {
    setRightDivVisible(false);
  };

  useEffect(() => {
    if (graphData || isLoading) {
      setRightDivVisible(true);
    }
  }, [graphData, isLoading]);

  return (
    <div className="flex flex-row w-full h-full overflow-hidden">
      <div
        className="flex flex-col items-center w-full h-full justify-center overflow-y-auto transition-all duration-800 ease-in-out"
        style={{
          width: isRightDivVisible ? "40%" : "100%",
        }}
      >
        <Chat />
      </div>

      <div
        className="flex flex-col items-center h-full justify-center transition-all duration-800 ease-in-out overflow-hidden"
        style={{
          width: isRightDivVisible ? "60%" : "0%",
          opacity: isRightDivVisible ? 1 : 0,
          pointerEvents: isRightDivVisible ? "auto" : "none", // Disable interactions when hidden
        }}
      >
        {isRightDivVisible && graphData && (
          <>
            <GraphContainer onClose={toggleRightDivOff} />
          </>
        )}
      </div>
    </div>
  );
};
