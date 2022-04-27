import React from "react";
import { Route, Routes } from "react-router-dom";
import Agenda from "~/pages/Agenda";
import Cliente from "~/pages/Cliente";
import Inicio from "~/pages/Inicio";
import Login from "~/pages/Login";


const RouteWrapper = () => (
    <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/cliente" element={<Cliente />} />
    </Routes>
);

export default RouteWrapper;
