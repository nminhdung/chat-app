import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Auth from "./pages/auth/Auth";
import { Profile } from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import PrivateRoute from "./pages/privateRoute";
import { getUserApi } from "./apis";
import { useDispatch, useSelector } from "react-redux";
import {  signInSuccess } from "./store/slices/userSlice";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const res = await getUserApi();
        if (res.result) {
          dispatch(signInSuccess({ userData: { ...res.result } }));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
