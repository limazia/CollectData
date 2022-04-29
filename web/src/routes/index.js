import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "~/pages/Login";
import ForgotPassword from "~/pages/ForgotPassword";

import Dashboard from "~/pages/Dashboard";
import Settings from "~/pages/Settings";

import BrandTatto from "~/pages/BrandTatto";
import Customers from "~/pages/Customers";
import Customer from "~/pages/Customer";
import NewCustomer from "~/pages/NewCustomer";

import NotFound from "~/pages/NotFound";

const RouteWrapper = () => (
  <Routes>
    <Route path="/" exact element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/brands" element={<BrandTatto />}>
      <Route path=":brandId" element={<BrandTatto />} />
      <Route path="create" element={<BrandTatto />} />
    </Route>
    <Route path="/customers" element={<Customers />}>
      <Route path=":customerId" element={<Customer />} />
      <Route path="create" element={<NewCustomer />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RouteWrapper;
