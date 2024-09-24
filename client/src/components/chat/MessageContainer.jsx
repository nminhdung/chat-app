import {  getMessagesApi } from "@/apis";
import { setSelectedChatMessages } from "@/store/slices/chatSlice";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import axios from "axios";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages } =
    useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const getMessages = async () => {
    try {
      const res = await getMessagesApi(selectedChatData._id);
      if (res.status) {
        dispatch(setSelectedChatMessages(res.result));
      }
    } catch (error) {
      console.log("🚀 ~ getMessages ~ error:", error);
    }
  };
  const downloadFile = async (url) => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/${url}`, {
      responseType: "blob",
    });
    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;

    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
   };
  const checkImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };
  useEffect(() => {
    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType]);
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
                ? "bg-[#1e13f1]/5 text-[#1e13f1]/90 border-[#1e13f1]/50 text-white"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#1e13f1]/5 text-[#1e13f1]/90 border-[#1e13f1]/50 text-white"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkImage(message.fileUrl) ? (
              <div className="cursor-pointer">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/${message.fileUrl}`}
                  className="w-[300px] h-[300px] object-cover"
                  alt="image"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 cursor-pointer">
                <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 "
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
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
