import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import userReducer from "./slices/userSlice.js";
import chatReducer from "./slices/chatSlice.js";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "chat-app/user",
  storage,
};
const persistContactConfig = {
  key: "chat-app/contacts",
  storage,
};
const userConfig = {
  ...persistConfig,
  whiteList: ["userInfo"],
};
const contactConfig = {
  ...persistContactConfig,
};
export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
    chat: persistReducer(contactConfig, chatReducer),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
export const persistor = persistStore(store);
