import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import { Profile } from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="*" element={<Navigate to='/auth'/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
