import React, { memo, useRef, useState, useStore } from "react";
import { Handle } from "reactflow";
import PGNodeFrag from "./PGNodeFrag";
import EC2NodeFrag from "./EC2NodeFrag";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Col,
  Row,
  Button,
} from "react-bootstrap";

export default memo(({ data, isConnectable  }) => {
  const pg_data = {};
  const ec2_data = { label: data.label };

  if (data.attachable === "pg") {
    console.log("TODO call axios Deploy PG now");
  }

  const onDependentNodeClick = (e) => {
    console.log("Dependent Node Clicked, so update content on side bar");

  };

  const styleObj = {
    fontSize: 8,
    color: "#0000ff",
    textAlign: "center",
    paddingTop: "100px",
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
      <div style={{ display: "flex", flexDirection: "column"}}>
        {"attachable" in data && data["attachable"] === "pg" ? (
          <PGNodeFrag data={pg_data} onDependentNodeClick={onDependentNodeClick} />
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
