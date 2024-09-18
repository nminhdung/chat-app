import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
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
  },
});
export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  closeChat,
  addMessage
} = chatSlice.actions;
export default chatSlice.reducer;
