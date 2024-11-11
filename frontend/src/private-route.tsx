import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "./stores/user-store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userStore = useUserStore();
  return userStore.user ? children : <Navigate to="/login" />; // this check needs to be better, right now it sometimes causes a refresh to navigate to login
};

export default PrivateRoute;
