import React, { useEffect } from "react";
import Logo from "@/components/logo/logo.jsx";
import ProfileInfo from "./ProfileInfo";
import NewDm from "./NewDm";
import { getContactsDMApi } from "@/apis";
import { useDispatch, useSelector } from "react-redux";
import { setDirectMessageContacts } from "@/store/slices/chatSlice";
import ContactList from "../contact/ContactList";

const ContactContainer = () => {
  const { directMessageContacts } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getContactsDM = async () => {
    const res = await getContactsDMApi();
    if (res.success) {
      dispatch(setDirectMessageContacts(res.result));
    }
  };
  useEffect(() => {
    if (userInfo) {
      getContactsDM();
    }
  }, [userInfo]);
  return (
    <div
      className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw]
     bg-[#1b1c24] border-r-2 border-[#2f303b] w-full "
    >
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5 ">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessageContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
