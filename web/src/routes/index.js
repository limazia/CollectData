import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "~/pages/Login";
import ForgotPassword from "~/pages/ForgotPassword";

const RouteWrapper = () => (
  <Routes>
    <Route path="/" exact element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </Routes>
);

export default RouteWrapper;
