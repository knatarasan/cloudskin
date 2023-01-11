import DnDFlow from "./components/canvas/CloudCanvas";
import Home from "./components/landing/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import React from "react";
import JsonEditor from "./components/editor/JsonEditor";
import vmschema from "./components/editor/schema/virtualMachine.json";
import vmdata from "./components/editor/schema/virtualMachine-data.json";

const App = () => {
  return (
    // <DnDFlow />
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="plan/:plan_id_edit" element={<DnDFlow />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="test" element={<JsonEditor schema={vmschema} data={vmdata} />} />
    </Routes>
  );
};

export default App;
