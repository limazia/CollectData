import React from "react";
import { Routes, Route } from "react-router-dom";

import Private from "./ProtectedRoutes";

import Login from "~/pages/Login";
import ForgotPassword from "~/pages/ForgotPassword";
import ResetPassword from "~/pages/ResetPassword";

import Dashboard from "~/pages/Dashboard";
import Settings from "~/pages/Settings";
import Schedule from "~/pages/Schedule";

import Tattos from "~/pages/Tattos";
import TattoCreate from "~/pages/Tattos/Create";
import TattoView from "~/pages/Tattos/View";
import TattoUpdate from "~/pages/Tattos/Update";

import Customers from "~/pages/Customers";
import CustomerCreate from "~/pages/Customers/Create";
import CustomerView from "~/pages/Customers/View";
import CustomerUpdate from "~/pages/Customers/Update";

import Professionals from "~/pages/Professionals";
import ProfessionalCreate from "~/pages/Professionals/Create";
import ProfessionalGet from "~/pages/Professionals/Get";
import ProfessionalUpdate from "~/pages/Professionals/Update";

import NotFound from "~/pages/NotFound";

const RouteWrapper = () => (
  <Routes>
    <Route path="/" exact element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/new-password/:token" exact element={<ResetPassword />} />

    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/schedule" element={<Schedule />} />

    <Route path="/customers" element={<Customers />} />
    <Route path="/customer/create" element={<CustomerCreate />} />
    <Route path="/customer/:customerId" element={<CustomerView />} />
    <Route path="/customer/edit/:customerId" element={<CustomerUpdate />} />

    <Route path="/professionals" element={<Professionals />} />
    <Route path="/professional/create" element={<ProfessionalCreate />} />
    <Route path="/professional/:professionalId" element={<ProfessionalGet />} />
    <Route path="/professional/edit/:professionalId" element={<ProfessionalUpdate />} />

    <Route path="/tattos" element={<Tattos />} />
    <Route path="/tatto/create" element={<TattoCreate />} />
    <Route path="/tatto/:tattoId" element={<TattoView />} />
    <Route path="/tatto/edit/:tattoId" element={<TattoUpdate />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RouteWrapper;
