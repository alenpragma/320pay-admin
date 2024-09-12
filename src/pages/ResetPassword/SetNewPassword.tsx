import { FaLock, FaUser } from "react-icons/fa";
import { images } from "../..";
import { SubmitHandler } from "react-hook-form";
import Form from "../../Components/Forms/Form";
import InputField from "../../Components/Forms/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { setPaymentaToken } from "../../hooks/handelAuthToken";
import { PuffLoader } from "react-spinners";

export const validationSchema = z.object({
  password: z.string().min(1, "This field is required."),
  cornfirmPassword: z.string().min(1, "This field is required."),
});

const SetNewPassword = () => {
  // const location = useLocation()
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/"
  const [showPassword, setShowPassword] = useState<boolean | null>(true);
  const [error, setError] = useState<string>("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const formSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/3 w-full mx-auto border border-slate-300 rounded-lg p-4">
        <div>
          <h4 className="text-[32px] font-medium text-[#1f1f1f]">Confirm reset password</h4>
        </div>
        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            password: "",
            cornfirmPassword: "",
          }}
        >
          <div className="space-y-6 mt-8">
            <div className="space-y-3">
              <p className="text-[#3e3e3e] font-medium text-[16px]">
                New Password
              </p>
              <div className="relative">
                <InputField
                  name="password"
                  type={showPassword ? "password" : "text"}
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-8 pr-4"
                  placeholder="password"
                />
                <FaLock className="absolute top-2 my-auto left-2 text-slate-500 text-[18px]" />
                {showPassword ? (
                  <FaRegEyeSlash
                    onClick={handleShowPassword}
                    className="absolute top-2 my-auto right-4 text-slate-500 text-[20px] cursor-pointer"
                  />
                ) : (
                  <FaRegEye
                    onClick={handleShowPassword}
                    className="absolute top-2 my-auto right-4 text-slate-500 text-[20px] cursor-pointer"
                  />
                )}
                <p className="text-red-500 text-[12px] mt-3">{error}</p>{" "}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[#3e3e3e] font-medium text-[16px]">
                Confirm New Password
              </p>
              <div className="relative">
                <InputField
                  name="cornfirmPassword"
                  type={showPassword ? "password" : "text"}
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-8 pr-4"
                  placeholder="Confirm new password"
                />
                <FaLock className="absolute top-2 my-auto left-2 text-slate-500 text-[18px]" />
                <p className="text-red-500 text-[12px] mt-3">{error}</p>{" "}
              </div>
            </div>

            <button className="px-5 py-3 rounded-xl bg-primary text-white font-semibold w-full">
              Confirm
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetNewPassword;
