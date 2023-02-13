import { create } from 'zustand'
import { NodeSchema } from "../models/NodeTypes";
import { AWSComponents } from '../models/AWSComponents';
import { DBComponents } from '../models/Databases';
import * as t from "typed-assert";

// define types for state values and actions separately
type State = {
    nodeSchemas: NodeSchema[];
}

type Actions = {
    getAllNodeSchemas: () => NodeSchema[];
    getNodeSchema: (schemaId: string) => NodeSchema;
}


export const useNodeSchemaStore = create<State & Actions>()((set, get) => ({
    nodeSchemas: [
        ...AWSComponents,
        ...DBComponents
    ],

    getAllNodeSchemas: () => { return get().nodeSchemas; },

    // methods for manipulating nodes
    getNodeSchema: (schemaId: string) => {
        let ns = get().nodeSchemas.find(ns => ns.schemaId === schemaId);
        t.isNotUndefined(ns);
        return ns;
    },
}))