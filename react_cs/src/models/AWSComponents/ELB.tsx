
import elbIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Networking-Content-Delivery/64/Arch_Elastic-Load-Balancing_64.svg";
import { Image } from 'react-bootstrap';
import React from 'react';
import { NodeSchema, NodeType } from "../NodeTypes";

export const ELB: NodeSchema = {
    schemaId: 'elb',
    name: 'ELB',
    category: 'AWS',
    nodeType: NodeType.Wrapper,
    icon: (props) => {
        return <Image className="rounded-circle" src={elbIcon} alt="ELB" width={props.size} height={props.size} />
    },
    definition: "ELB definition"
}
