import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "~/pages/Login";
import Inicio from "~/pages/Inicio";
import Agenda from "~/pages/Agenda";

const RouteWrapper = () => (
  <Routes>
    <Route path="/" exact element={<Login />} />
    <Route path="/inicio" element={<Inicio />} />
    <Route path="/agenda" element={<Agenda />} />
  </Routes>
);

export default RouteWrapper;
