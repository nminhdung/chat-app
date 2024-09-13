import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.userInfo = action.payload.userData;
      state.isLoggedIn = true;
    },
    updateSuccess: (state, action) => {
      state.userInfo = action.payload.userData;
    },
    logoutSuccess: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { signInSuccess, updateSuccess,logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
