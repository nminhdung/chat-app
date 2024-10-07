import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  const cookie = Cookies.get("accessToken");
  return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-red-300">
      <div className="bg-white shadow-md w-[25%] h-[20%] flex flex-col items-center p-4 rounded-md gap-4">
        <h1 className="text-4xl font-bold">Welcome to my Chat App</h1>
        <Button className="uppercase tracking-wider">
          {userInfo && cookie ? (
            <Link to="/chat">Go to Box Chat</Link>
          ) : (
            <Link to="/auth">Sign in to use this app</Link>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Home;
