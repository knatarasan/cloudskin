import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { ReactFlowProvider } from "reactflow";



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);
