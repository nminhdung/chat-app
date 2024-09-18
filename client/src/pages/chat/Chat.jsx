import ChatContainer from "@/components/chat/ChatContainer";
import ContactContainer from "@/components/chat/ContactContainer";
import EmptyChatContainer from "@/components/chat/EmptyChatContainer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { selectedChatType } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
      {/* <EmptyChatContainer />
      <ChatContainer /> */}
    </div>
  );
};

export default Chat;
