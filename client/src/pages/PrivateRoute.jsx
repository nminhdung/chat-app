import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { logoutSuccess } from "@/store/slices/userSlice";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cookie = Cookie.get("accessToken");
  if (!cookie) {
    dispatch(logoutSuccess());
  }

  return userInfo ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
