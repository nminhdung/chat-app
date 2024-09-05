import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.userInfo = action.payload.userData;
    },
    updateSuccess: (state, action) => {
      state.userInfo = action.payload.userData;
    },
  },
});

export const { signInSuccess, updateSuccess } = userSlice.actions;

export default userSlice.reducer;
