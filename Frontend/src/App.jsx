import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectWrapper from "./components/auth/UserProtectWrapper";
import UserLogout from "./components/UserLogout";
import CaptainProtectWrapper from "./components/auth/CaptainProtectWrapper";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./components/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import { useUserStore } from "./Store/useUserStore";
import { useCaptainStore } from "./Store/useCaptainStore";

const App = () => {
  const initializeUser = useUserStore((state) => state.initializeUser);
  const initializeCaptain = useCaptainStore((state) => state.initializeCaptain);

  useEffect(() => {
    initializeUser();
    initializeCaptain();
  }, [initializeUser, initializeCaptain]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        {/* /riding route is for temporary purpose we will fix this later */}
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
