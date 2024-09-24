import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { logoutApi } from "@/apis";
import { logoutSuccess } from "@/store/slices/userSlice";
import { getColor } from "@/lib/utils";
import { setSelectedChatData, setSelectedChatType } from "@/store/slices/chatSlice";

const ProfileInfo = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      if (res.success) {
        dispatch(logoutSuccess());
      
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center px-10 justify-between w-full bg-[#2a2b33]">
      <div className="flex items-center gap-3 justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12   rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                src={`${import.meta.env.VITE_SERVER_URL}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`
                  uppercase h-12 w-12  text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                    userInfo.color
                  )}
                  `}
              >
                {userInfo?.firstName
                  ? userInfo?.firstName.split("").shift()
                  : userInfo?.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo?.firstName && userInfo?.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-blue-500 text-xl font-medium"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] text-white border-none">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500 text-xl font-medium"
                onClick={handleLogout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] text-white border-none">
              Log out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
