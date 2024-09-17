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
  },
});
export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  closeChat
} = chatSlice.actions;
export default chatSlice.reducer;
