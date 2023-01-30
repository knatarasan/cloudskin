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

export default memo(({ data, isConnectable }) => {
  const pg_data = {};
  const ec2_data = { id: data.label };

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
            <Col></Col>
          </Row>
        ) : null}

        <Row>
          <Col>
            <EC2NodeFrag data={ec2_data} />
          </Col>
        </Row>
        <Row>
          <Col align="top" className="align-self-start">
            <div
              style={{
                fontSize: 8,
                color: "#0000ff",
                textAlign: "center",
                paddingTop: "0px",
                backgroundColor: "yellow",
              }}
            >
              aws comp id: {data.id}
            </div>
          </Col>
        </Row>
      </Container>

      {/* <Container>
        {"attachable" in data && data["attachable"] === "pg" ? (
          <Row>
            <Col>
              <PGNodeFrag data={pg_data} />
            </Col>
            <Col></Col>
          </Row>
        ) : null}

        <Row>
          <Col>
            <EC2NodeFrag data={ec2_data} />
          </Col>
        </Row>
      </Container> */}

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
