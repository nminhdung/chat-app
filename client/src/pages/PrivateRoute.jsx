import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
