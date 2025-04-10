/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Graph } from './Graph';
export type DataProduct = {
    /**
     * Unique identifier for the data product.
     */
    id: string;
    /**
     * The name of the data product.
     */
    name: string;
    /**
     * Status of the data product.
     */
    status?: string;
    /**
     * List of source systems associated with the data product.
     */
    sourceSystems?: Array<string>;
    /**
     * The owner of the data product.
     */
    dataOwner: string;
    /**
     * The steward of the data product.
     */
    dataSteward: string;
    /**
     * List of use cases for the data product.
     */
    useCases?: Array<string>;
    /**
     * Quality score of the data product as a percentage.
     */
    qualityScore: number;
    /**
     * Description of the data product.
     */
    description: string;
    /**
     * Graphs of the components of the data product.
     */
    graphs?: Array<Graph>;
};

