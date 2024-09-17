import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import "./index.css";
import { persistor, store } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <App />
      <Toaster />
    </SocketProvider>
  </Provider>
);
