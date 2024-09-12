import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { PuffLoader } from "react-spinners"
import axiosInstance from "../../utils/axiosConfig"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"

export interface OTPFormInputs {
  otp: string[]
}

const Otp = () => {
  const location = useLocation()

  const { confirmationResponsData } = location.state || {}
  console.log(confirmationResponsData)

  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm<OTPFormInputs>({
    defaultValues: {
      otp: ["", "", "", ""],
    },
  })

  const onSubmit = async (data: OTPFormInputs) => {
    const otp = data.otp.join("")

    console.log("Entered OTP:", otp)
    const confirmData = {
      id: confirmationResponsData?.id,
      code: otp,
    }

    if (!confirmationResponsData?.id) {
      toast.error("data not found")
      return
    }
    const withdrowResponse = await axiosInstance.post(
      "/client/withdraw-confirm",
      confirmData
    )
    console.log(withdrowResponse)
    if (withdrowResponse?.data.success == 200) {
      toast.success(withdrowResponse?.data?.msg)
    }
    if (withdrowResponse?.data?.error) {
      toast.error(withdrowResponse?.data?.msg)
    }
    setLoading(false)
    // Handle OTP submission logic here
  }

  return (
    <div className="md:w-1/2 w-full mx-auto mt-20 border border-slate-300 rounded-lg">
      <h4 className="w-full bg-primary font-semibold text-[20px] text-white px-3 rounded-t-lg py-2">
        Withdraw
      </h4>
      <p className="text-[14px] text-secondary  px-3 my-5">
        Enter The 6 Digit Code To Process <br /> Your Withdraw
      </p>
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
                      const target = e.target as HTMLInputElement
                      const value = target.value

                      // Allow only digits
                      if (/^\d$/.test(value) || value === "") {
                        field.onChange(value)
                      }

                      // Handle backspace
                      if (value === "" && index > 0) {
                        const previousSibling =
                          target.previousElementSibling as HTMLInputElement | null
                        previousSibling?.focus()
                      }

                      // Move to the next input on valid input
                      if (/^\d$/.test(value) && index < 5) {
                        const nextSibling =
                          target.nextElementSibling as HTMLInputElement | null
                        nextSibling?.focus()
                      }
                    }}
                  />
                )}
              />
            ))}
          </div>
          <p
            className="text-[14px] px-3 my-10 text-right cursor-pointer hover:text-red-500"
            // onClick={() => handleResendOtp()}
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
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Otp
