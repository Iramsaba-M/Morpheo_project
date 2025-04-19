/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatHistoryResponse } from '../models/ChatHistoryResponse';
import type { ChatRequest } from '../models/ChatRequest';
import type { ChatResponse } from '../models/ChatResponse';
import type { ConversationsResponse } from '../models/ConversationsResponse';
import type { DataProduct } from '../models/DataProduct';
import type { DataProductAction } from '../models/DataProductAction';
import type { DataProductsResponse } from '../models/DataProductsResponse';
import type { GraphResponse } from '../models/GraphResponse';
import type { PromptsResponse } from '../models/PromptsResponse';
import type { SourceSystem } from '../models/SourceSystem';
import type { SourceSystemAction } from '../models/SourceSystemAction';
import type { SourceSystemsResponse } from '../models/SourceSystemsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

// New types for graph operations
export interface GraphFilterRequest {
    systemId: string;
    domainId: string;
}

export interface GraphBatchRequest {
    systemIds: string[];
}

export interface GraphEntityResponse {
    data: Array<{
        data: {
            icon: string;
            id: string;
            label: string;
            type: string;
        };
    }>;
    graphType: string;
}

export interface GraphDomainResponse {
    domains: any[];
}

export interface GraphSourceSystemResponse {
    sourceSystems: any[];
}

export interface GraphClientResponse {
    clientData: any;
}

export interface GraphNode {
    data: {
        id: string;
        label: string;
        type: string;
        icon?: string;
    };
}

export interface GraphDataResponse {
    data: GraphNode[];
    graphType: string;
}

export interface ClientGraphResponse {
    systems: GraphDataResponse;
    domains: GraphDataResponse;
    entities: GraphDataResponse;
}

export interface SystemDomainsResponse {
    data: Array<{
        data: {
            icon: string;
            id: string;
            label: string;
            type: string;
        };
    }>;
    graphType: string;
}

export class DefaultService {
    /**
     * Start a new chat with the LLM.
     * Creates a new chat session and provides a response, which may include text, selectable options, or references to additional data.
     * @param requestBody
     * @returns ChatResponse Response from the LLM with a new chat ID.
     * @throws ApiError
     */
    public static postApiChat(
        requestBody: ChatRequest,
    ): CancelablePromise<ChatResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Send a message to an existing chat with the LLM.
     * Handles user input for an existing chat session and provides a response, which may include text, selectable options, or references to additional data.
     * @param chatId
     * @param requestBody
     * @returns ChatResponse Response from the LLM.
     * @throws ApiError
     */
    public static postApiChatChatId(
        chatId: string,
        requestBody: ChatRequest,
    ): CancelablePromise<ChatResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/{chatId}',
            path: {
                'chatId': chatId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
                404: `Chat not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve a specific chat session.
     * Fetches the record of a conversation to this point for the specified chat ID.
     * @param chatId
     * @returns ChatHistoryResponse Record of the conversation.
     * @throws ApiError
     */
    public static getApiChatChatId(
        chatId: string,
    ): CancelablePromise<ChatHistoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/{chatId}',
            path: {
                'chatId': chatId,
            },
            errors: {
                404: `Chat not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve additional data referenced by the LLM response.
     * Fetches detailed data based on a reference ID provided in the LLM's response.
     * @param id
     * @returns GraphResponse Additional data retrieved successfully.
     * @throws ApiError
     */
    public static getApiGraphId(
         clientId: string = 'client_004'
    ): CancelablePromise<GraphResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/clients/{clientId}/all',
            path: {
                'clientId': clientId,
            },
            errors: {
                404: `Data not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve suggested prompts for the logged-in user.
     * Provides a list of suggested prompts personalized for the authenticated user.
     * @returns PromptsResponse List of suggested prompts.
     * @throws ApiError
     */
    public static getApiPrompts(): CancelablePromise<PromptsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/prompts',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve previous conversations for the logged-in user.
     * Provides a list of previous conversations including their chat IDs, summaries, and the date/time of the last message.
     * @returns ConversationsResponse List of previous conversations.
     * @throws ApiError
     */
    public static getApiConversations(): CancelablePromise<ConversationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/conversations',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve all data products.
     * Provides a list of all data products with their details.
     * @returns DataProductsResponse List of data products.
     * @throws ApiError
     */
    public static retrieveDataProducts(): CancelablePromise<DataProductsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/data_products',
            errors: {
                404: `Client not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve a specific data product by ID.
     * Fetches details for the specified data product.
     * @param dataProductId
     * @returns DataProduct Details of the specified data product.
     * @throws ApiError
     */
    public static retrieveDataProduct(
        dataProductId: string,
    ): CancelablePromise<DataProduct> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/data_products/{dataProductId}',
            path: {
                'dataProductId': dataProductId,
            },
            errors: {
                404: `Data product not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Interact with a data product
     * Changes the status of a data product.
     * @param dataProductId
     * @param requestBody
     * @returns any Action complete.
     * @throws ApiError
     */
    public static updateDataProduct(
        dataProductId: string,
        requestBody: DataProductAction,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/data_products/{dataProductId}',
            path: {
                'dataProductId': dataProductId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Data Product not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve all source systems.
     * Provides a list of all source systems with their details.
     * @returns SourceSystemsResponse List of source systems.
     * @throws ApiError
     */
    public static retrieveSourceSystems(): CancelablePromise<SourceSystemsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/source_systems',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Retrieve a specific source system by ID.
     * Fetches details for the specified source system.
     * @param id
     * @returns SourceSystem Details of the specified source system.
     * @throws ApiError
     */
    public static retrieveSourceSystem(
        id: string,
    ): CancelablePromise<SourceSystem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/source_systems/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Source System not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Interact with a source system
     * Loads data/simulates training for a source system.
     * @param id
     * @param requestBody
     * @returns any Action complete.
     * @throws ApiError
     */
    public static updateSourceSystem(
        id: string,
        requestBody: SourceSystemAction,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/source_systems/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Source System not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Heathcheck endpoint
     * Checks if the api instance is healthy
     * @returns void
     * @throws ApiError
     */
    public static getHealthz(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/healthz',
        });
    }
    /**
     * Readiness endpoint
     * Checks if the api is ready to serve content
     * @returns any Ok
     * @throws ApiError
     */
    public static getReadiness(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/readiness',
        });
    }

    //New updated graph APIs
    /**
     * Filter entities by system and domain
     * @param requestBody
     * @returns GraphEntityResponse Filtered entities
     * @throws ApiError
     */
    public static postApiGraphEntitiesFilter(
        requestBody: GraphFilterRequest,
    ): CancelablePromise<GraphEntityResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/graph/entities/filter',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Get all source systems
     * @returns GraphSourceSystemResponse List of source systems
     * @throws ApiError
     */
    public static getApiGraphSourceSystems(): CancelablePromise<GraphSourceSystemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/source_systems',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Get all data for a specific client
     * @param clientId
     * @returns GraphClientResponse Client data
     * @throws ApiError
     */
    public static getApiGraphClientsClientIdAll(
        clientId: string,
    ): CancelablePromise<GraphClientResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/clients/{clientId}/all',
            path: {
                'clientId': clientId,
            },
            errors: {
                404: `Client not found.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Get domains in batch for specified systems
     * @param requestBody
     * @returns GraphDomainResponse List of domains
     * @throws ApiError
     */
    public static postApiGraphDomainsBatch(
        requestBody: GraphBatchRequest,
    ): CancelablePromise<GraphDomainResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/graph/domains/batch',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
                500: `Server error.`,
            },
        });
    }
    /**
     * Get person entities
     * @returns GraphEntityResponse List of person entities
     * @throws ApiError
     */
    public static getApiGraphEntitiesEntity(): CancelablePromise<GraphEntityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/entities/person',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Get all entities
     * @returns GraphEntityResponse List of all entities
     * @throws ApiError
     */
    public static getApiGraphEntities(): CancelablePromise<GraphEntityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/entities',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Get all domains
     * @returns GraphDomainResponse List of all domains
     * @throws ApiError
     */
    public static getApiGraphDomains(): CancelablePromise<GraphDomainResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/domains',
            errors: {
                500: `Server error.`,
            },
        });
    }
    /**
     * Get domains by system
     * @param systemId The ID of the system to get domains for
     * @returns SystemDomainsResponse List of domains for the specified system
     * @throws ApiError
     */
    public static getApiDomainsSystemId(
        systemId: string,
    ): CancelablePromise<SystemDomainsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/graph/systems/{systemId}/domains',
            path: {
                'systemId': systemId,
            },
            errors: {
                404: `System not found.`,
                500: `Server error.`,
            },
        });
    }
}
