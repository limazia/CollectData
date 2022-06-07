import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { parseCookies } from "nookies";

import useAuth from "~/hooks/useAuth";

import Login from "~/pages/Login";

import Dashboard from "~/pages/Dashboard";
import Settings from "~/pages/Settings";
import Schedule from "~/pages/Schedule";

import ContractCreate from "~/pages/Contracts/Create";
import ContractView from "~/pages/Contracts/View";

import Customers from "~/pages/Customers";
import CustomerCreate from "~/pages/Customers/Create";
import CustomerView from "~/pages/Customers/View";
import CustomerUpdate from "~/pages/Customers/Update";

import Professionals from "~/pages/Professionals";
import ProfessionalCreate from "~/pages/Professionals/Create";
import ProfessionalView from "~/pages/Professionals/View";
import ProfessionalUpdate from "~/pages/Professionals/Update";

import NotFound from "~/pages/NotFound";

const RouteWrapper = () => {
  const Private = ({ children }) => {
    const { "collect.token": token } = parseCookies();
 
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return children;
  }
  
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />

      <Route exact path="/" element={<Private><Dashboard /></Private>} />
      <Route path="/settings" element={<Private><Settings /></Private>} />
      <Route path="/schedule" element={<Private><Schedule /></Private>} />

      <Route path="/customers" element={<Private><Customers /></Private>} />
      <Route path="/customer/create" element={<Private><CustomerCreate /></Private>} />
      <Route path="/customer/:customerId" element={<Private><CustomerView /></Private>} />
      <Route path="/customer/edit/:customerId" element={<Private><CustomerUpdate /></Private>} />
      
      <Route path="/professionals" element={<Private><Professionals /></Private>} />
      <Route path="/professional/create" element={<Private><ProfessionalCreate /></Private>} />
      <Route path="/professional/:professionalId" element={<Private><ProfessionalView /></Private>} />
      <Route path="/professional/edit/:professionalId" element={<Private><ProfessionalUpdate /></Private>} />

      <Route path="/contract/create/:customerId" element={<Private><ContractCreate /></Private>} />
      <Route path="/contract/:contractId" element={<Private><ContractView /></Private>} />

      <Route path="*" element={<Private><NotFound /></Private>} />
    </Routes>
  );
}

export default RouteWrapper;