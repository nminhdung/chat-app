import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages } =
    useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderDMMessages = (message) => {
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#1e13f1]/5 text-[#1e13f1]/90 border-[#1e13f1]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.time).format("LT")}
        </div>
      </div>
    );
  };
  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.time).format("DD-MM-YYYY");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.time).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden py-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div className="" ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
