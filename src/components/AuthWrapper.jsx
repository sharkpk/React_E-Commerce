import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AuthWrapper() {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
  return <Navigate to="/login" replace />;
}

export default AuthWrapper;
