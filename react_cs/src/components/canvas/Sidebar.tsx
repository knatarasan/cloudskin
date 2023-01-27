import React from "react";

import LoadBalancerIcon from "react-aws-icons/dist/aws/compute/LoadBalancer";
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2";
import { nanoid } from "nanoid"
import {  Link } from "react-router-dom";


const ComponentsBar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    const id = nanoid()
    const dataString = JSON.stringify({ id, nodeType })
    event.dataTransfer.setData("application/reactflow", dataString);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <Link to="/dashboard">Dashboard</Link>
      <div className="description">PALETTE</div>
      <div id='App'
        className="dndnode input"
        onDragStart={(event) => {
          return onDragStart(event, "ec2");
        }}
        draggable
      >
        <EC2Icon />
      </div>
      <div id='LB'
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "lb")}
        draggable
      >
        <LoadBalancerIcon />
      </div>
    </aside>
  );
};


export default ComponentsBar;