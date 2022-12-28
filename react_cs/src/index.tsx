import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import { UserProvider } from "./Context";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
