import React from "react";

import LoadBalancerIcon from "react-aws-icons/dist/aws/compute/LoadBalancer";
import EC2Icon from "react-aws-icons/dist/aws/logo/EC2";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">PALETTE</div>
      <div
        className="dndnode input"
        onDragStart={(event) => {
          console.log("Drag started");
          return onDragStart(event, "App");
        }}
        draggable
      >
        <EC2Icon />
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "LB")}
        draggable
      >
        <LoadBalancerIcon />
      </div>
    </aside>
  );
};
