import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import "./styles.css";
import App from "./App";
import { ReactFlowProvider } from "reactflow";
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);
