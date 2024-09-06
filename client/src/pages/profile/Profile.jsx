import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageProfileApi,
  updateUserApi,
  uploadImageProfileApi,
} from "@/apis";
import { updateSuccess } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [firstName, setFirstName] = useState("DUNG");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateUser = () => {
    if (!firstName) {
      toast.error("First name is required.");
      return;
    }
    if (!lastName) {
      toast.error("Last name is required.");
      return;
    }
    return true;
  };
  const handleChange = async () => {
    if (validateUser()) {
      try {
        const res = await updateUserApi(userInfo.id, {
          firstName,
          lastName,
          color: selectedColor,
        });
        if (res.success) {
          dispatch(updateSuccess({ userData: res.result }));
          toast.success("Profile updated successfully.");
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    console.log({ file });
    if (file) {
      const formData = new FormData();
      formData.append(`${e.target.name}`, file);
      const res = await uploadImageProfileApi(formData);
      if (res.success) {
        dispatch(
          updateSuccess({ userData: { ...userInfo, image: res.result } })
        );
        toast.success("Image uploaded successfully.");
      }
    }
  };
  const handleDeleteImage = async (e) => {
    try {
      const res = await deleteImageProfileApi();
      if (res.msg) {
        dispatch(updateSuccess({ ...userInfo, image: null }));
        toast.success(`${res.msg}`);
        setImage(null);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (userInfo?.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo?.image) {
      setImage(`${import.meta.env.VITE_SERVER_URL}/${userInfo.image}`);
    }
  }, [userInfo]);

  useEffect(() => {
    // if (!userInfo?.profileSetup) {
    //   toast.warning("Please setup profile to continue.", {
    //     style: { color: "orange", border: "1px solid orange" },
    //     className: "class",
    //   });
    // }
  }, [userInfo]);
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48  rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`
                  uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex justify-center items-center rounded-full ${getColor(
                    selectedColor
                  )}
                  `}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                onClick={image ? handleDeleteImage : handleFileInputClick}
                className="absolute w-full h-32 md:h-full flex items-center justify-center 
              bg-black/50 ring-fuchsia-50 rounded-full text-white"
              >
                {image ? (
                  <FaTrash className="text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleChangeImage}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5  text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white outline-1"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all 300"
            onClick={handleChange}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
