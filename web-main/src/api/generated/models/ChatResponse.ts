/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatListItem } from './ChatListItem';
export type ChatResponse = {
    /**
     * Unique identifier for the chat session.
     */
    chatId: string;
    /**
     * The LLM's response text.
     */
    responseText: string;
    options?: Array<ChatListItem>;
    /**
     * ID to retrieve additional data if required. This will be a valid ID to call the graph endpoint if it exists.
     */
    dataReferenceId?: string;
};

