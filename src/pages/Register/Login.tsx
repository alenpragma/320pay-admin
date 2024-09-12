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
import Container from "../../Components/Shared/Container";
import LoaingAnimation from "../../Components/Loading/LoaingAnimation";
import LoadingButton from "../../Components/Loading/LoadingButton";

export const validationSchema = z.object({
  email: z.string().min(1, "This field is required."),
  password: z.string().min(1, "This field is required."),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean | null>(true);
  const [error, setError] = useState<string>("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const formSubmit: SubmitHandler<any> = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", data);
      if (response?.data?.success == 200) {
        setPaymentaToken(response?.data?.token);
        toast.success("login successfull");
        navigate("/");
        return;
      }
      if (response?.data?.success != 200) {
        // setPaymentaToken(response?.data?.token);
        // toast.error(response?.data?.message);

        setLoading(false);
        setError("Your password is incorrect or this account doesn’t exist");
        // navigate("/");
        return;
      }
    } catch (error) {
      setLoading(false);
      // console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center w-full px-3 h-screen">
        <div className="flex-1 md:block hidden">
          <img className="w-full h-auto" src={images.loginImage} alt="" />
        </div>
        <div className="flex-1 md:bg-[#fff] bg-[#313fd52b] md:p-0 p-4 md:rounded-none rounded-md md:w-3/4 w-full mx-auto">
          <img className="w-32 h-10" src={images.logo} alt="" />
          <h4 className="text-primary text-[24px] font-semibold my-2">
            Welcome to 3TwentyPay!
          </h4>
          <p className="text-secondary font-semibold ">
            Multichain EVM Wallet, Transaction & Balance Management, Super
            Secure with Server Side solution integrate with your business today!
          </p>
          <Form
            onSubmit={formSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <div className="space-y-6 mt-8">
              <div className="space-y-3">
                <label
                  htmlFor="name"
                  className="text-[#3e3e3e] font-semibold text-[18px]"
                >
                  email
                </label>
                <div className="relative">
                  <InputField
                    name="email"
                    type="text"
                    className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                    placeholder="Enter Your Email"
                  />
                  <FaUser className="absolute top-2 my-auto left-4 text-slate-500 text-[18px]" />
                </div>
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="password"
                  className="text-[#3e3e3e] font-semibold text-[18px]"
                >
                  Password
                </label>
                <div className="relative">
                  <InputField
                    name="password"
                    type={showPassword ? "password" : "text"}
                    className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                    placeholder="password"
                  />
                  <FaLock className="absolute top-2 my-auto left-4 text-slate-500 text-[18px]" />
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
              <div className="text-right">
                <Link
                  to="/password-reset"
                  className="text-primary font-medium underline text-[14px]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="w-full mt-6 border border-slate-300 rounded-lg">
                {loading ? (
                  <LoaingAnimation size={30} color="#36d7b7" />
                ) : (
                  <LoadingButton className="w-full">Login</LoadingButton>
                )}
              </div>
              <p className="text-secondary text-[14px]">
                Don't have an Account?{" "}
                <Link to="/register" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
