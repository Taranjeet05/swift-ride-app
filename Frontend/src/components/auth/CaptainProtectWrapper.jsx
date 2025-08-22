import React from "react";
import { Navigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/captain-login" />;
  }

  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
