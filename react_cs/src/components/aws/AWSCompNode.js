import React, { memo } from "react";
import { Handle } from "reactflow";
import PGNodeFrag from "./PGNodeFrag";
import EC2NodeFrag from "./EC2NodeFrag";

export default memo(({ data, isConnectable }) => {
  const pg_data = {};
  const ec2_data = {
    label: data.label,
    color: data.color,
    api_object: data.api_object,
  };

  if (data.attachable === "pg") {
    console.log("TODO call axios Deploy PG now");
  }

  const onDependentNodeClick = (e) => {
    console.log("Dependent Node Clicked, so update content on side bar");
  };

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {"attachable" in data && data["attachable"] === "pg" ? (
          <PGNodeFrag
            data={pg_data}
            onDependentNodeClick={onDependentNodeClick}
          />
        ) : null}
        <EC2NodeFrag data={ec2_data} />
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
