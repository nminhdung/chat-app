import { getColor } from "@/lib/utils";
import {
  setSelectedChatMessages,
  setSelectedChatType,
  setSelectedChatData,
} from "@/store/slices/chatSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";

const ContactList = ({ contacts, isChannel = false }) => {
  const dispatch = useDispatch();
  const { selectedChatType, selectedChatData } = useSelector(
    (state) => state.chat
  );

  const handleClick = (contact) => {
    if (isChannel) {
      dispatch(setSelectedChatType("channel"));
    } else {
      dispatch(setSelectedChatType("contact"));
    }
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch(setSelectedChatMessages([]));
    }
    dispatch(setSelectedChatData(contact));
  };

  return (
    <div className="mt-5">
      {contacts?.map((contact) => {
        return (
          <div
            key={contact._id}
            className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
              selectedChatData && selectedChatData._id === contact._id
                ? "bg-[#7972f6f4] hover:bg-[#1e13f1]/80"
                : "hover:bg-[#f1f1f111]"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex gap-5 items-center justify-start text-white">
              {!isChannel && (
                <Avatar className="h-10 w-10   rounded-full overflow-hidden">
                  {contact?.image ? (
                    <AvatarImage
                      src={`${import.meta.env.VITE_SERVER_URL}/${
                        contact.image
                      }`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black"
                    />
                  ) : (
                    <div
                      className={` ${
                        selectedChatData && selectedChatData._id === contact._id
                          ? "bg-[#ffffff22] border border-white/50"
                          : getColor(contact.color)
                      }
                              uppercase h-10 w-10   text-lg border-[1px] flex justify-center items-center rounded-full }
                             `}
                    >
                      {contact?.firstName
                        ? contact?.firstName.split("").shift()
                        : contact?.email.split("").shift()}
                    </div>
                  )}
                </Avatar>
              )}
              {isChannel && (
                <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                  #
                </div>
              )}
              {isChannel ? (
                <span>{contact.name}</span>
              ) : (
                <span>
                  {contact.firstName} {contact.lastName}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
