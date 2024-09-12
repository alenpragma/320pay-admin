import React, { useEffect, useState } from "react";
import Form from "../../Components/Forms/Form";
import { PuffLoader } from "react-spinners";
import InputField from "../../Components/Forms/InputField";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const validationSchema = z.object({
  password: z.string().min(1, "This field is required."),
  confirmPassword: z.string().min(1, "This field is required."),
  code: z.string().min(6, "Input your 6-digit otp code"),
});

const PasswordOtp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const getEmail = () => {
    const emailFromL = localStorage.getItem("userEmail");
    setEmail(emailFromL);
  };
  useEffect(() => {
    getEmail();
  }, []);
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const { code, password, confirmPassword } = data;
    try {
      if (password !== confirmPassword) {
        setError("password & confirm password doesn't match");
        setLoading(false);
        return;
      }
      const response = await axiosInstance.post("/password-reset-store", {
        email: email,
        code: code,
        password: password,
      });
      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          text: `Your password chenged successfully`,
        });
        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: `Your otp doesn't match`,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen px-3">
      <div className="md:w-1/3 w-full mx-auto border border-slate-300 rounded-lg p-3">
        <div className="text-[24px] font-medium border-b w-fit border-secondary pb-1 mb-4 pr-4">
          <p>Reset your password</p>
        </div>
        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            password: "",
            confirmPassword: "",
            code: "",
          }}
        >
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-secondary font-medium">New Password</p>
              <div className="relative">
                <InputField
                  name="password"
                  type={showPassword ? "password" : "text"}
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 px-4"
                  placeholder="Set new password"
                />
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
                {/* <p className="text-red-500 text-[12px] mt-3">{error}</p>{" "} */}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-secondary font-medium">Confirm Password</p>
              <div className="relative">
                <InputField
                  name="confirmPassword"
                  type="password"
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 px-4"
                  placeholder="Confirm new password"
                />
                <p className="text-red-500 text-[12px] mt-3">{error}</p>{" "}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-secondary font-medium">OTP</p>
              <div className="relative">
                <InputField
                  name="code"
                  type="text"
                  className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 px-4"
                  placeholder="Enter Your 6-digit Otp"
                  maxlength={6}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="border border-slate-300 rounded-xl">
                <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
              </div>
            ) : (
              <button className="px-5 py-3 rounded-xl bg-primary text-white font-semibold w-full">
                Confirm Reset
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PasswordOtp;

// import { useForm, Controller } from "react-hook-form";
// import Container from "../../Components/Shared/Container";
// import { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosConfig";
// import { PuffLoader } from "react-spinners";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// interface OTPFormInputs {
//   otp: string[];
// }

// const PasswordOtp = () => {
//   const { control, handleSubmit } = useForm<OTPFormInputs>({
//     defaultValues: {
//       otp: ["", "", "", "", "", ""],
//     },
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data: OTPFormInputs) => {
//     const otp = data.otp.join("");
//     console.log(otp);
//     setLoading(true);
//     return;
//     try {
//       const response = await axiosInstance.post("/verified", { otp: otp });

//       if (response?.data?.success === true) {
//         Swal.fire({
//           icon: "success",
//           text: `Validation Successfully`,
//         });
//         navigate("/");
//       }
//       if (response?.data?.success === false) {
//         Swal.fire({
//           icon: "error",
//           text: `OTP validation Failed, Please try again`,
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleResendOtp = async () => {
//   //   const response = await axiosInstance.get("/send-otp");
//   //   console.log(response);
//   //   if (response?.data?.success === 200) {
//   //     toast("email validation code send");
//   //   }
//   //   console.log(response);
//   // };

//   return (
//     <Container>
//       <div className="flex justify-center items-center h-screen">
//         <div className="md:w-1/3 w-full mx-auto border border-slate-300 rounded-lg p-3">
//           <div className="text-start space-y-3">
//             <h4 className="text-[32px] font-medium border-b border-slate-300 pb-3 text-[#1f1f1f]">
//               Registration Validation
//             </h4>
//             <p className="text-secondary">
//               {" "}
//               A verification code has been sent to your email. Please check your
//               inbox to proceed.
//             </p>
//           </div>
//           <div className="my-10 px-3">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="w-full mx-auto flex justify-around items-center gap-3">
//                 {Array.from({ length: 6 }).map((_, index) => (
//                   <Controller
//                     key={index}
//                     name={`otp.${index}`}
//                     control={control}
//                     render={({ field }) => (
//                       <input
//                         {...field}
//                         type="text" // Change type to "text" to allow letters
//                         maxLength={1}
//                         className="w-12 h-12 text-center border rounded-md"
//                         onChange={(e) => {
//                           const target = e.target as HTMLInputElement;
//                           const value = target.value;

//                           // Allow any single character (digit or letter)
//                           if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
//                             field.onChange(value);
//                           }

//                           // Handle backspace
//                           if (value === "" && index > 0) {
//                             const previousSibling =
//                               target.previousElementSibling as HTMLInputElement | null;
//                             previousSibling?.focus();
//                           }

//                           // Move to the next input on valid input
//                           if (/^[a-zA-Z0-9]$/.test(value) && index < 5) {
//                             const nextSibling =
//                               target.nextElementSibling as HTMLInputElement | null;
//                             nextSibling?.focus();
//                           }
//                         }}
//                       />
//                     )}
//                   />
//                 ))}
//               </div>
//               <p
//                 className="text-[14px] px-3 my-10 text-right cursor-pointer hover:text-red-500"
//                 // onClick={() => handleResendOtp()}
//               >
//                 Resend Code?
//               </p>
//               <div className="w-1/2 mx-auto mt-6 border border-slate-300 rounded-lg bg-blue-100">
//                 {loading ? (
//                   <div className="w-full">
//                     <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
//                   </div>
//                 ) : (
//                   <button className="px-5 py-3 rounded-lg bg-primary text-white font-semibold w-full">
//                     Sign Up
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default PasswordOtp;
