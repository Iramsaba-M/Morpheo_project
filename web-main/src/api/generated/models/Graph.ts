/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GraphComponent } from './GraphComponent';
export type Graph = {
    /**
     * The type of the graph.
     */
    graphType: Graph.graphType;
    data: Array<GraphComponent>;
};
export namespace Graph {
    /**
     * The type of the graph.
     */
    export enum graphType {
        DOMAIN = 'domain',
        ENTITY = 'entity',
        SYSTEM = 'system',
    }
}

