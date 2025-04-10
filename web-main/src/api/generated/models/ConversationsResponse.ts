/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * List of previous conversations for the user.
 */
export type ConversationsResponse = Array<{
    /**
     * Unique identifier for the chat session.
     */
    chatId?: string;
    /**
     * Single-line text summarizing the conversation.
     */
    summary?: string;
    /**
     * Date and time of the last message in the conversation.
     */
    lastMessageDateTime?: string;
}>;
