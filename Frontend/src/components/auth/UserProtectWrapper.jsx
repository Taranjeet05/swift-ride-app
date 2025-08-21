import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default UserProtectWrapper;
