import React from "react";
import LoginNavbar from "../pages/Register/LoginNavbar";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="relative">
      <div className="fixed right-0 left-0 mx-auto">
        <LoginNavbar />
      </div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
