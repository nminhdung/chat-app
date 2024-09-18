import { closeChat } from "@/store/slices/chatSlice";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getColor } from "@/lib/utils";
const ChatHeader = () => {
  const { selectedChatData, selectedChatType } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center px-20 justify-between">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center ">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12   rounded-full overflow-hidden">
              {selectedChatData?.image ? (
                <AvatarImage
                  src={`${import.meta.env.VITE_SERVER_URL}/${
                    selectedChatData.image
                  }`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`
                              uppercase h-12 w-12  text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                                selectedChatData.color
                              )}
                             `}
                >
                  {selectedChatData?.firstName
                    ? selectedChatData?.firstName.split("").shift()
                    : selectedChatData?.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {selectedChatType === "contact"
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : `${selectedChatData.email}`}
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none 
          focus:text-white duration-300 transition-300"
            onClick={() => dispatch(closeChat())}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
