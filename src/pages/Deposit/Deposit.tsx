import { FaCopy } from "react-icons/fa";
import { images } from "../..";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils/Actions";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import { MdContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const Deposit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<any>();
  const [timeout, setTimeouts] = useState<boolean>(false);

  const handleCopy = (copy: string) => {
    copyToClipboard(copy);
    setTimeouts(true);
    setTimeout(() => {
      setTimeouts(false);
    }, 3000);
  };

  const getWallet = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/client-wallets");
      if (response?.data?.success === 200) {
        setWallet(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWallet();
  }, []);

  const shortenAddress = (address: string) => {
    if (!address) return "";
    const firstPart = address.slice(0, 10);
    const lastPart = address.slice(-8);
    return `${firstPart}....${lastPart}`;
  };

  return (
    <div className="md:p-8 pt-5">
      <div className="md:w-2/5 w-11/12 mx-auto ">
        {/* <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}

          defaultValues={{
            currency: "",
          }}
        >
          <SelectField
            name="currency"
            className=""
            options={currency}
            placeholder="Please select an option"
          />
        </Form> */}
        <div className="mt-5 border border-[#E2E2E9] rounded-2xl">
          <div className="py-2 bg-primary w-full rounded-t-2xl px-5">
            <span className="font-semibold text-white ">
              Pay BNB/ETH/USDT [BEP20/ERC20]
            </span>
          </div>
          <div className="p-8 ">
            <div className="flex justify-center items-center">
              <img src={images.qrCode} alt="" />
            </div>
            <div className="w-full  rounded-lg bg-[#91919131] flex justify-end items-center text-end">
              <span className=" w-full text-[14px]  text-start pl-3 font-semibold">
                {loading ? (
                  <Skeleton height={30} count={1} />
                ) : (
                  shortenAddress(wallet?.client_wallet_address)
                )}
              </span>
              {timeout == false ? (
                <MdContentCopy
                  onClick={() => handleCopy(wallet?.client_wallet_address)}
                  className="cursor-pointer rotate-180 size-6"
                />
              ) : (
                <TiTick className="size-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
