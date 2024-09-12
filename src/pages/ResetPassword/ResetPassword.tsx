import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../../Components/Forms/Form";
import InputField from "../../Components/Forms/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import Container from "../../Components/Shared/Container";
import axiosInstance from "../../utils/axiosConfig";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2";

export const validationSchema = z.object({
  email: z.string().min(1, "This field is required."),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/forgot-password", data);
      console.log(response);
      if (response?.status === 200) {
        localStorage.setItem("userEmail", data.email);
        navigate("/password-reset/password-otp");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: `User not found`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="md:w-2/5 w-full mx-auto border border-slate-300 rounded-lg p-4 shadow-md">
          <div className="md:bg-[#fff] bg-[#313fd52b] md:p-0 p-4 md:rounded-none rounded-md  mx-auto">
            <h4 className=" text-[#1e1e1e] text-[24px] font-semibold my-2">
              Forgot Password
            </h4>
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
              }}
            >
              <div className="mt-8 space-y-8">
                <div className="space-y-2 my-5">
                  <p className="text-[#3e3e3e] font-medium text-[16px]">
                    Email
                  </p>
                  <div className="relative">
                    <InputField
                      name="email"
                      type="text"
                      className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                      placeholder="Enter Your Email"
                    />
                    <CiMail className="absolute top-2 my-auto left-2 text-slate-500 size-[20px]" />
                  </div>
                </div>
                <p className="mb-4 left-9 text-[14px]">
                  We’ll send a verification code to this email.
                </p>
                {loading ? (
                  <div className="border border-slate-300 rounded-xl">
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  </div>
                ) : (
                  <button className="px-5 py-3 rounded-xl bg-primary text-white font-semibold w-full">
                    Send Email
                  </button>
                )}
                <Link to="/" className="mt-5">
                  <button className="px-5 py-3 rounded-xl text-secondary hover:text-black hover:underline font-semibold w-full">
                    Back
                  </button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
