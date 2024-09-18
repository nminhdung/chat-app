import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Lottie from "react-lottie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { searchContactsApi } from "@/apis";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useDebounce } from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedChatData,
  setSelectedChatMessages,
  setSelectedChatType,
} from "@/store/slices/chatSlice";

const NewDm = () => {
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.chat);
  const [openNewContact, setOpenNewContact] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchValue = useDebounce(searchTerm, 300);
  const searchContacts = async () => {
    try {
      if (searchValue.trim().length > 0) {
        const res = await searchContactsApi(searchValue);
        if (res.success) {
          setSearchedContacts([...res.result]);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log("🚀 ~ searchContacts ~ error:", error);
    }
  };
  const selectNewContact = (contact) => {
    setOpenNewContact(false);
    dispatch(setSelectedChatType("contact"));
    dispatch(setSelectedChatData(contact));
    dispatch(setSelectedChatMessages([]));
    setSearchTerm("");
  };
  useEffect(() => {
    if (searchValue.trim().length <= 0) {
      setSearchedContacts([]);
      return;
    }
    searchContacts();
  }, [searchValue]);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90
             hover:text-neutral-100 duration-300 transition-all cursor-pointer"
              onClick={() => setOpenNewContact(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] text-white border-none mb-2 p-3">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => {
                  return (
                    <div
                      className="flex gap-3 items-center cursor-pointer"
                      key={contact._id}
                      onClick={() => selectNewContact(contact)}
                    >
                      <div className="w-12 h-12 relative">
                        <Avatar className="h-12 w-12   rounded-full overflow-hidden">
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
                              className={`
                              uppercase h-12 w-12  text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                                contact.color
                              )}
                             `}
                            >
                              {contact?.firstName
                                ? contact?.firstName.split("").shift()
                                : contact?.email.split("").shift()}
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {contact?.firstName && contact?.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : `${contact.email}`}
                        </span>
                        <span className="text-xs">{contact?.email} </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}

          {searchedContacts.length <= 0 && (
            <div className="flex-1  md:flex mt-5 flex-col justify-center items-center  duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div
                className="flex flex-col gap-5 items-center text-center
                     mt-5 lg:text-2xl text-xl transition-all duration-300 text-opacity-80 text-white"
              >
                <h1 className="poppins-medium">
                  Hi<span className="text-blue-500">! </span>
                  Search new <span className="text-blue-500">Contact.</span>
                </h1>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
