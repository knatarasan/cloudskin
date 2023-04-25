import DnDFlow from "./components/canvas/CloudCanvas";
import Home from "./components/landing/Home";
import FAQ from "./components/landing/FAQ";
import Pricing from "./components/landing/Pricing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import IAMUser from "./components/auth/IAMUser";
import { Routes, Route } from "react-router-dom";
import React from "react";
import IconTester from "./components/canvas/IconTester";

const App = () => {
  return (
    // <DnDFlow />
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="plan/:plan_id_edit" element={<DnDFlow />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="iconTester" element={<IconTester schema={{}} data={{}} />} />
      <Route path="iamuser" element={<IAMUser />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="pricing" element={<Pricing/>} />

    </Routes>
  );
};

export default App;
