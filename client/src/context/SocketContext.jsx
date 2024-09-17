import { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const { userInfo } = useSelector((state) => state.user);
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
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo.id]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
