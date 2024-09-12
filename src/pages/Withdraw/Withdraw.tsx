import { FieldValues, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosConfig"
import Form from "../../Components/Forms/Form"
import SelectField from "../../Components/Forms/SelecetField"
import InputField from "../../Components/Forms/InputField"
import { useNavigate } from "react-router-dom"

export const validationSchema = z.object({
  currency: z.string().min(1, "This field is required"),
  // network: z.string().min(1, "This field is required"),
  wallet: z.string().min(1, "This field is required"),
  amount: z.string().min(1, "This field is required"),
})

const Withdraw = () => {
  // const [loading, setLoading] = useState<boolean>(false)
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [availableTokens, setAvailableTokens] = useState([])
  const navigate = useNavigate()

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    const withdrawData = {
      amount: data.amount,
      wallet_address: data.wallet,
      token_id: data.currency,
      network: selectedCurrency.rpc_chain,
    }

    navigate("/dashboard/withdraw/preview", { state: { withdrawData } })
  }
  const getDatas = async () => {
    const response = await axiosInstance.get("/client-tokens")
    if (response?.data?.data) {
      setAvailableTokens(response?.data?.data)
    }
  }
  useEffect(() => {
    getDatas()
  }, [])

  const currencys = availableTokens?.map((item: any) => ({
    label: item?.token_symbol,
    value: item.tokenId,
    image: item.image,
  }))

  const handleCurrencyChange = (value: string) => {
    const selectedToken = availableTokens.find((token: any) => {
      return token.tokenId == value
    })
    setSelectedCurrency(selectedToken)
  }

  return (
    <div className="w-full mt-5 px-3">
      <div className=" md:w-1/2 w-full mx-auto border border-slate-300 shadow-4 rounded-lg md:px-0">
        <h4 className="w-full bg-primary font-semibold text-[20px] text-white px-3 rounded-t-lg py-2">
          Withdraw
        </h4>
        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            currency: "",
            wallet: "",
            amount: "",
          }}
        >
          <div className="w-full mx-auto px-3 my-10">
            <div className="relative mb-8">
              <p className="font-semibold text-secondary mb-2">
                Choose Currency
              </p>
              <SelectField
                name="currency"
                className=""
                type="string"
                options={currencys}
                placeholder="Please select an option"
                onChange={handleCurrencyChange}
              />
            </div>
            <div className="relative mb-8">
              <p className="font-semibold text-secondary mb-2">Network</p>
              <div className="relative">
                <input
                  type="text"
                  name="network"
                  placeholder={"Network"}
                  defaultValue={(selectedCurrency?.rpc_chain as string) || ""}
                  className={`${
                    selectedCurrency?.rpc_chain
                      ? "text-black pl-10"
                      : "text-secondary px-4"
                  } w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pr-4`}
                  readOnly
                />

                <img
                  className="absolute w-6 top-1 my-auto left-2 text-slate-500 text-[20px] cursor-pointer"
                  src={selectedCurrency?.image}
                  alt=""
                />
              </div>
            </div>
            <div className="relative mb-8">
              <p className="font-semibold text-secondary mb-2">
                Wallet Address
              </p>
              <InputField
                name="wallet"
                type="text"
                className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 px-4"
                placeholder="Enter Your Wallet Address"
              />
            </div>
            <div className="relative mb-8">
              <p className="font-semibold text-secondary mb-2">Amount</p>
              <InputField
                name="amount"
                type="number"
                className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 px-4"
                placeholder="Enter Your Amount"
              />
            </div>
            <button className="px-7 py-2 flex justify-center mx-auto rounded-md bg-primary text-white font-semibold cursor-pointer">
              Submit
            </button>
            {/* <SlideButton onSubmit={formSubmit} /> */}
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Withdraw
