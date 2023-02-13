import { Node } from 'reactflow';
import { IconType } from "react-icons";


export enum NodeType {
    Wrapper = 'wrapper',
    Container = 'container',
    Process = 'process',
}

export interface NodeSchema {
    readonly schemaId: string;
    readonly name: string;
    readonly category: string;
    readonly description?: string;
    readonly icon: IconType;
    readonly nodeType: NodeType;
    readonly definition: string;
}

export interface NodeData {
    readonly id: string;
    readonly schemaId: string,
    readonly parentNodeId?: string;
    label: string;
    properties: string;
}

export type CustomNode = Node<NodeData>;