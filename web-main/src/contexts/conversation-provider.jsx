import { createContext, useContext, useState } from "react";
import { DefaultService } from "@/api/generated/services/DefaultService";
import { useGraph } from "@/contexts/graph-provider";

const ConversationContext = createContext(null);

export const ConversationProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const { loadGraph, graphData } = useGraph();

  const addUserMessage = (messageText) => {
    setMessages((existing) => [
      ...existing,
      { id: crypto.randomUUID(), source: "user", message: messageText },
      { id: crypto.randomUUID(), source: "thinking" },
    ]);
  };
  const addAIMessage = (messageText, options, dataReferenceId) => {
    console.log("AI Response: " + messageText);

    setMessages((existing) => [
      ...existing.filter((item) => item.source !== "thinking"),
      {
        id: crypto.randomUUID(),
        source: "assistant",
        message: messageText,
        options: options,
        dataReferenceId: dataReferenceId,
      },
    ]);
  };
  const loadConversation = async (chatId) => {
    setConversationId(chatId);

    // Call the Conversation endpoint to pre-load the conversation
    try {
      const resp = await DefaultService.getApiChatChatId(chatId);
      setMessages(resp.history);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const clearConversation = async () => {
    setConversationId(null);
    setMessages([]);
  };

  const sendMessage = async (messageText) => {
    setIsWorking(true);
    addUserMessage(messageText);
    if (conversationId !== null) {
      // Continue conversation
      try {
        const resp = await DefaultService.postApiChatChatId(conversationId, {
          text: messageText,
        });
        addAIMessage(resp.responseText, resp.options, resp.dataReferenceId);

        if (resp.dataReferenceId) {
          console.log("Data Ref: " + resp.dataReferenceId);
          loadGraph(resp.dataReferenceId);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    } else {
      // New conversation
      try {
        const resp = await DefaultService.postApiChat({ text: messageText });
        setConversationId(resp.chatId);
        addAIMessage(resp.responseText, resp.options, resp.dataReferenceId);

        if (resp.dataReferenceId !== "") {
          loadGraph(resp.dataReferenceId);
          console.log(graphData);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    }

    setIsWorking(false);
  };

  const contextValue = {
    conversationId,
    setConversationId,
    loadConversation,
    clearConversation,
    sendMessage,
    messages,
    isWorking,
  };

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider",
    );
  }
  return context;
};
