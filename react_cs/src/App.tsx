import DnDFlow from "./CloudCanvas";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    // <DnDFlow />
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="plan" element={<DnDFlow />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
