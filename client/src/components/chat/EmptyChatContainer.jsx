import { animationDefaultOptions } from "@/lib/utils";
import React from "react";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div
        className="flex flex-col gap-5 items-center text-center
       mt-10 lg:text-4xl text-3xl transition-all duration-300 text-opacity-80 text-white"
      >
        <h1 className="poppins-medium">
          Hi<span className="text-blue-500">! </span>
          Welcome to <span className="text-blue-500">Chat app</span>
        </h1>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
