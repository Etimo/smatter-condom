import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "./user-store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
