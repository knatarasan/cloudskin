import React, { memo, useRef, useState } from "react";
import { Handle } from "reactflow";
import PGCompNode from "./PGCompNode";

export default memo(({ data, isConnectable }) => {
  const PG_ref = useRef(false);
  const pg_data = {};

  if (data.attachable === "pg") {
    console.log("TODO call axios Deploy PG now");
  }
  const ec2Clicked = () =>{

    console.log('Only EC2 is clicked ');

  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      {"attachable" in data && data["attachable"] === "pg" ? (
        <PGCompNode data={pg_data} />
      ) : null}

      <div onClick={ec2Clicked}>
        <svg
          className="w-6 h-6"
          height="40"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
              id="Arch_Amazon-EC2_32_svg__a"
            >
              <stop stop-color="#C8511B" offset="0%"></stop>
              <stop stop-color="#F90" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="none" fill-rule="evenodd">
            <path
              d="M0 0h40v40H0z"
              fill="url(#Arch_Amazon-EC2_32_svg__a)"
            ></path>
            <path
              d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </div>

      <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="10" r="4" fill="red" stroke="red" />
      </svg>

      <div>aws comp id: {data.label}</div>

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
