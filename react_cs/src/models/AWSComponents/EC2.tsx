
import ec2Icon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_Amazon-EC2_64.svg";
import React from 'react';
import { Image } from 'react-bootstrap';
import { NodeSchema, NodeType } from "../NodeTypes";


export const EC2: NodeSchema = {
    schemaId: 'ec2',
    name: 'EC2',
    category: 'AWS',
    nodeType: NodeType.Container,
    icon: (props) => {
        return <Image className="rounded-circle" src={ec2Icon} alt="EC2" width={props.size} height={props.size} />
    },
    definition: "EC2 definition"
}

