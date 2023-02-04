import { Node } from 'reactflow';
import { RJSFSchema } from "@rjsf/utils";


type DataType = { label: string, schema: RJSFSchema | null, value: any };
// type NodeType = 'input' | 'output' | 'default'
// export type DataNode = Omit<Node<DataType>, 'type'> & {
//     type: NodeType
// }

export type DataNode = Node<DataType>;