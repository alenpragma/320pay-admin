import { FaLock, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { images } from "../..";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Form from "../../Components/Forms/Form";
import InputField from "../../Components/Forms/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { useState } from "react";
import { BiPhone } from "react-icons/bi";
import { setPaymentaToken } from "../../hooks/handelAuthToken";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2";

const inputFieldSchema = z.object({
  name: z.string().min(1, "This field is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().refine((val) => val.length >= 10, {
    message: "Phone number must be at least 10 digits long.",
  }),
  password: z.string().min(1, "This field is required."),
  password_confirmation: z.string().min(1, "This field is required."),
});

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean | null>(true);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setLoading(true);
    const { password, password_confirmation } = data;
    if (password !== password_confirmation) {
      setError(
        "password and confirm-password aren't matching. please check again"
      );
    }
    try {
      const response = await axiosInstance.post("/register", data);
      console.log(response);
      if (response?.data?.status === 200) {
        Swal.fire({
          icon: "success",
          text: `User registered successfully. Please check your email for verification.`,
        });
        navigate("/register/register-otp");
        setPaymentaToken(response?.data?.token);
      }
      if (response?.data?.status !== 200) {
        Swal.fire({
          icon: "error",
          text: `Your email or phone is allready set`,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-between items-center md:w-10/12 px-3 w-full mx-auto h-screen overflow-y-auto md:py-0 py-4 md:pt-0 pt-10">
      <div className="flex-1 md:block hidden">
        <img className="w-full h-auto" src={images.loginImage} alt="" />
      </div>
      <div className="flex-1">
        <img className="w-32 h-10" src={images.logo} alt="" />
        <h4 className="text-primary text-[24px] font-semibold my-2">
          Welcome to 3TwentyPay!
        </h4>
        <p className="text-secondary font-semibold ">
          Multichain EVM Wallet, Transaction & Balance Management, Super Secure
          with Server Side solution integrate with your business today!
        </p>
        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(inputFieldSchema)}
          defaultValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
          }}
        >
          <div className="space-y-6 mt-8">
            <div className="space-y-1 ">
              <p className="text-[#3e3e3e] font-semibold text-[15px]">Name</p>
              <div className="relative">
                <InputField
                  name="name"
                  type="text"
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                  placeholder="Enter your user name"
                />
                <FaUser className="absolute top-2 my-auto left-4 text-slate-500 text-[18px]" />
              </div>
            </div>

            <div className="space-y-1 ">
              <p className="text-[#3e3e3e] font-semibold text-[15px]">Email</p>
              <div className="relative">
                <InputField
                  name="email"
                  type="email"
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                  placeholder="Enter Your E-Mail"
                />
                <MdEmail className="absolute top-2 my-auto left-4 text-slate-500 text-[18px]" />
              </div>
            </div>

            <div className="space-y-1 ">
              <p className="text-[#3e3e3e] font-semibold text-[15px]">Phone</p>
              <div className="relative">
                <InputField
                  name="phone"
                  type="number"
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                  placeholder="Enter Your Phone"
                />
                <BiPhone className="absolute top-2 my-auto left-4 text-slate-500 text-[18px]" />
              </div>
            </div>

            <div className="space-y-1 ">
              <p className="text-[#3e3e3e] font-semibold text-[15px]">
                Password
              </p>
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
              </div>
            </div>
            <div className="space-y-1 ">
              <p className="text-[#3e3e3e] font-semibold text-[15px]">
                Confirm Password
              </p>
              <div className="relative">
                <InputField
                  name="password_confirmation"
                  type="password"
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                  placeholder="Confirm Password"
                />
                <FaLock className="absolute top-2 my-auto left-4 text-slate-500 text-[18px]" />
              </div>
              {error ? (
                <p className="text-[10px] text-red-500 mt-2">
                  Warning: {error}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="space-y-3">
              <div className="w-full mt-6 border border-slate-300 rounded-lg bg-blue-100">
                {loading ? (
                  <div className="w-full">
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  </div>
                ) : (
                  <button className="px-5 py-3 rounded-lg bg-primary text-white font-semibold w-full">
                    Sign Up
                  </button>
                )}
              </div>

              <p>
                You Have Al ready a account{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
