import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import userReducer from "./slices/userSlice.js";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "chat-app/user",
  storage,
};

const userConfig = {
  ...persistConfig,
  whiteList: ["userInfo"],
};
export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
export const persistor = persistStore(store);
