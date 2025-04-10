import { useConversation } from "@/contexts/conversation-provider";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ChatInput = () => {
  const { sendMessage, isWorking } = useConversation();
  const [query, setQuery] = useState("");

  const handleKeyDown = (event) => {
    if (isWorking) {
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    if (isWorking) {
      return;
    }
    event.preventDefault();
    const tmpQuery = query;
    setQuery("");
    await sendMessage(tmpQuery);
  };

  return (
    <div className="w-full flex flex-row min-h-20 rounded-3xl rounded-tr-sm bg-gray-100 border-0 align-baseline p-5">
      <Textarea
        rows="1"
        className="border-0 min-h-10"
        placeholder="Type in your response or click option below"
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="rounded-full w-10 h-10" onClick={handleSubmit}>
        <ArrowUp />
      </Button>
    </div>
  );
};
