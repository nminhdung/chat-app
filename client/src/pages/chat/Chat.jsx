import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo]);

  return <div>Chat</div>;
};

export default Chat;
