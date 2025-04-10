/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatListItem } from './ChatListItem';
export type ChatHistoryMessage = {
    /**
     * The content of the message, either from the user or the agent.
     */
    message: string;
    /**
     * Indicates whether the message is from the user or the agent.
     */
    source: ChatHistoryMessage.source;
    options?: Array<ChatListItem>;
    /**
     * ID to retrieve additional data (only present if this is an agent message).
     */
    dataReferenceId?: string;
};
export namespace ChatHistoryMessage {
    /**
     * Indicates whether the message is from the user or the agent.
     */
    export enum source {
        USER = 'user',
        AGENT = 'agent',
    }
}

