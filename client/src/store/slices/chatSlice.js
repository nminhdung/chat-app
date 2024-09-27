import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedContacts: undefined,
  selectedChatMessages: [],
  directMessageContacts: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload;
    },
    setSelectedChatMessages: (state, action) => {
      state.selectedChatMessages = [...action.payload];
    },
    setSelectedContacts: (state, action) => {
      state.selectedContacts = action.payload;
    },
    closeChat: (state) => {
      (state.selectedChatData = undefined),
        (state.selectedChatType = undefined),
        (state.selectedChatMessages = []);
    },
    addMessage: (state, action) => {
      const selectedChatMessages = state.selectedChatMessages;
      const selectedChatType = state.selectedChatType;
      state.selectedChatMessages = [
        ...selectedChatMessages,
        {
          ...action.payload,
          recipient:
            selectedChatType === "channel"
              ? action.payload.recipient
              : action.payload.recipient._id,
          sender:
            selectedChatType === "channel"
              ? action.payload.sender
              : action.payload.sender._id,
        },
      ];
    },
    setDirectMessageContacts: (state, action) => {
      state.directMessageContacts = [...action.payload];
    },
  },
});
export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  setSelectedContacts,
  closeChat,
  addMessage,
  setDirectMessageContacts,
} = chatSlice.actions;
export default chatSlice.reducer;
