import React, { memo, useRef, useState } from "react";
import { Handle } from "reactflow";
import PGNodeFrag from "./PGNodeFrag";
import EC2NodeFrag from "./EC2NodeFrag";
import { Container, Navbar, Nav, Table, Col, Row, Button } from "react-bootstrap";

export default memo(({ data, isConnectable }) => {
  const pg_data = {};
  const ec2_data = {};

  if (data.attachable === "pg") {
    console.log("TODO call axios Deploy PG now");
  }

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

      <Container>
      {"attachable" in data && data["attachable"] === "pg" ? (
        <Row>
          <Col>
          <PGNodeFrag data={pg_data} />
          </Col>
          <Col>            
          </Col>
        </Row>
        
      ) : null}

        <Row>
          <Col>
            <EC2NodeFrag data={ec2_data} />
          </Col>
          <Col>
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="10" r="4" fill="red" stroke="red" />
            </svg>
          </Col>
        </Row>
        <Row>
          <div style={styleObj}>aws comp id: {data.label}</div>
        </Row>
      </Container>


      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
