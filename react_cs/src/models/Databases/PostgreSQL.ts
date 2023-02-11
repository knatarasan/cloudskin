
import { SiPostgresql } from 'react-icons/si';
import { NodeSchema, NodeType } from '../NodeTypes';

export const PostgreSQL: NodeSchema = {
    schemaId: 'pg',
    name: 'PostgreSQL',
    category: 'Database',
    nodeType: NodeType.Process,
    icon: SiPostgresql,
    definition: "PG definition"
}
