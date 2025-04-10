import { useState, useEffect, useRef } from "react";
import { useConversation } from "@/contexts/conversation-provider";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-message";
import { WelcomeBanner } from "@/components/welcome-banner";

const templatePrompts = [
  "Go to a previous conversation",
  "Search the data catalog",
  "Access an existing product",
  "Connect to a new internal data source",
  "Connect to a new external source",
  "Curate data or modify an existing data model",
];

export const Chat = ({ prompts = templatePrompts }) => {
  const [initial, setInitial] = useState(true);
  const messagesEndRef = useRef(null);
  const { messages } = useConversation();

  useEffect(() => {
    if (messages.length > 0) {
      setInitial(false);
    } else {
      setInitial(true);
    }

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return initial ? (
    <div className="flex flex-grow">
      <div className="flex flex-col p-6 justify-center items-center self-center gap-4 flex-grow ease-in-out duration-300">
        <WelcomeBanner />
        <ChatInput />
        <div className="flex flex-row flex-wrap justify-center items-center content-center gap-2">
          {prompts.map((prompt) => (
            <Button variant="outline" className="text-xs" key={prompt}>
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto p-5 w-full">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      <footer className="p-5">
        <ChatInput />
      </footer>
    </div>
  );
};
