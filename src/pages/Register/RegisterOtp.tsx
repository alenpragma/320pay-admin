import { useForm, Controller } from "react-hook-form";
import Container from "../../Components/Shared/Container";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { OTPFormInputs } from "../OtpPage/Otp";

const PasswordOtp = () => {
  const { control, handleSubmit } = useForm<OTPFormInputs>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: OTPFormInputs) => {
    const otp = data.otp.join("");

    setLoading(true);
    try {
      const response = await axiosInstance.post("/verified", { otp: otp });

      if (response?.data?.success === true) {
        Swal.fire({
          icon: "success",
          text: `Validation Successfully`,
        });
        navigate("/");
      }
      if (response?.data?.success === false) {
        Swal.fire({
          icon: "error",
          text: `OTP validation Failed, Please try again`,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const response = await axiosInstance.get("/send-otp");
    console.log(response);
    if (response?.data?.success === 200) {
      toast("email validation code send");
    }
    console.log(response);
  };

  //   const [isDisabled, setIsDisabled] = useState(false);
  //   const [timer, setTimer] = useState<number | null>(null);
  //   const handleResendOtp = async () => {
  //     if (!isDisabled) {
  //       const response = await axiosInstance.get("/send-otp");
  //       console.log(response);
  //       setIsDisabled(true);
  //       setTimer(
  //         window.setTimeout(() => {
  //           setIsDisabled(false);
  //         }, 3000)
  //       );
  //     }
  //   };
  //   useEffect(() => {
  //     return () => {
  //       if (timer !== null) {
  //         clearTimeout(timer);
  //       }
  //     };
  //   }, [timer]);

  return (
    <Container>
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-1/3 w-full mx-auto border border-slate-300 rounded-lg p-3">
          <div className="text-start space-y-3">
            <h4 className="text-[32px] font-medium border-b border-slate-300 pb-3 text-[#1f1f1f]">
              Registration Validation
            </h4>
            <p className="text-secondary">
              {" "}
              A verification code has been sent to your email. Please check your
              inbox to proceed.
            </p>
          </div>
          <div className="my-10 px-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mx-auto flex justify-around items-center gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Controller
                    key={index}
                    name={`otp.${index}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="tel"
                        maxLength={1}
                        className="w-12 h-12 text-center border rounded-md"
                        onChange={(e) => {
                          const target = e.target as HTMLInputElement;
                          const value = target.value;

                          // Allow only digits
                          if (/^\d$/.test(value) || value === "") {
                            field.onChange(value);
                          }

                          // Move to the next input on valid input
                          if (/^\d$/.test(value) && index < 5) {
                            const nextSibling =
                              target.nextElementSibling as HTMLInputElement | null;
                            nextSibling?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          const target = e.target as HTMLInputElement;

                          // Handle backspace to focus on the previous input
                          if (
                            e.key === "Backspace" &&
                            !target.value &&
                            index > 0
                          ) {
                            const previousSibling =
                              target.previousElementSibling as HTMLInputElement | null;
                            previousSibling?.focus();
                          }
                        }}
                      />
                    )}
                  />
                ))}
              </div>
              <p
                className="text-[14px] px-3 my-10 text-right cursor-pointer hover:text-red-500"
                onClick={() => handleResendOtp()}
              >
                Resend Code?
              </p>
              <div className="w-1/2 mx-auto mt-6 border border-slate-300 rounded-lg bg-blue-100">
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
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PasswordOtp;
