import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterLayout = () => {
  return (
    <>
      <div className="relative">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterLayout;
