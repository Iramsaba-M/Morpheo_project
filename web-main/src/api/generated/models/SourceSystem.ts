/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SourceSystemField } from './SourceSystemField';
export type SourceSystem = {
    /**
     * Unique identifier for the system.
     */
    id: string;
    /**
     * The name of source system, initially one of salesforce, aws, or sql.
     */
    type: string;
    /**
     * The text to display to the user
     */
    system_description?: string;
    /**
     * Status array for this connection.
     */
    status: {
        /**
         * Overall status of the source system
         */
        overall: string;
        /**
         * Indicates the data connection status
         */
        data: string;
        /**
         * Training Status for this system
         */
        training: string;
    };
    /**
     * The owner of the data product.
     */
    fields: Array<SourceSystemField>;
};

