import { EC2 } from './EC2'
import { ELB } from './ELB'
import { ComponentSchema } from "../ComponentDefs";

export const AWSComponents: ComponentSchema[] = [EC2, ELB];