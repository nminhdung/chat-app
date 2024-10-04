import { addMessage } from "@/store/slices/chatSlice";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { selectedChatType, selectedChatData } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  const socket = useRef();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(import.meta.env.VITE_SERVER_URL, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          dispatch(addMessage(message));
        }
      };
      const handleRecieveChannelMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          selectedChatData._id === message.channelId
        ) {
          dispatch(addMessage(message))
          console.log(message);
        }
      };
      socket.current.on("recieveMessage", handleRecieveMessage);
      socket.current.on("recieve-channel-message", handleRecieveChannelMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
