import { FaRegCopy } from "react-icons/fa";
import { images } from "../..";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils/Actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";

const DashboardCardOne = ({ clientProfile, totalBalance }: any) => {
  const [wallet, setWallet] = useState<any>("");

  const handleCopy = (copy: string) => {
    copyToClipboard(copy);
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);

  const getWallet = async () => {
    try {
      setWalletLoading(true);
      const response = await axiosInstance.get("/client-wallets");
      if (response?.data?.success === 200) {
        setWallet(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    } finally {
      setWalletLoading(false);
    }
  };
  useEffect(() => {
    getWallet();
  }, []);

  const creteWallet = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/client/create-address");
      console.log(response);

      if (response?.data?.success == 200) {
        getWallet();
        // setCreatedAddress(response?.data?.data)
        toast.info(response?.data?.message);
        navigate("/wallet");
        return;
      }
      if (response?.data?.error == 400) {
        return toast.error(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  // const shortenAddress = (address: string) => {
  //   if (!address) return ""
  //   const firstPart = address.slice(0, 5)
  //   const lastPart = address.slice(-6)
  //   return `${firstPart}....${lastPart}`
  // }

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="md:p-5 p-1 rounded-xl border-2 border-[#E2E2E9] relative px-2">
          <div className="flex items-center gap-5 pt-8 md:pt-0 w-full">
            <div className="w-fit">
              <div className="md:size-[70px] size-[32px] bg-[#E8E2FD] flex justify-center items-center rounded-full">
                <img className=" md:size-[40px]" src={images.profile} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <h4 className="text-[#616365] font-medium md:text-[24px] text-[12px]">
                All User
              </h4>
              <span className="md:text-[28px] text-[12px] font-medium text-[#313436] w-full">
                <div>
                  {walletLoading ? (
                    <div className="w-full">
                      <Skeleton
                        height={40}
                        count={1}
                        highlightColor="#F4F5F6"
                      />
                    </div>
                  ) : (
                    <p className="flex justify-between items-center">
                      <span className="text-[#5734DC] md:text-[24px] text-[20px]">
                        100
                      </span>
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="md:p-5 p-1 rounded-xl border-2 border-[#E2E2E9] relative px-2">
          <div className="flex items-center gap-5 pt-8 md:pt-0 w-full">
            <div className="w-fit">
              <div className="md:size-[70px] size-[32px] bg-[#E8E2FD] flex justify-center items-center rounded-full">
                <img className=" md:size-[40px]" src={images.wallet1} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <h4 className="text-[#616365] font-medium md:text-[24px] text-[12px]">
                Deposit
              </h4>
              <span className="md:text-[28px] text-[12px] font-medium text-[#313436] w-full">
                <div>
                  {walletLoading ? (
                    <div className="w-full">
                      <Skeleton
                        height={40}
                        count={1}
                        highlightColor="#F4F5F6"
                      />
                    </div>
                  ) : (
                    <p className="flex justify-between items-center">
                      <span className="text-[#5734DC] md:text-[24px] text-[20px]">
                        100
                      </span>
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="md:p-5 p-1 rounded-xl border-2 border-[#E2E2E9] relative px-2">
          <div className="flex items-center gap-5 pt-8 md:pt-0 w-full">
            <div className="w-fit">
              <div className="md:size-[70px] size-[32px] bg-[#E8E2FD] flex justify-center items-center rounded-full">
                <img className=" md:size-[40px]" src={images.wallet1} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <h4 className="text-[#616365] font-medium md:text-[24px] text-[12px]">
                Withdraw
              </h4>
              <span className="md:text-[28px] text-[12px] font-medium text-[#313436] w-full">
                <div>
                  {walletLoading ? (
                    <div className="w-full">
                      <Skeleton
                        height={40}
                        count={1}
                        highlightColor="#F4F5F6"
                      />
                    </div>
                  ) : (
                    <p className="flex justify-between items-center">
                      <span className="text-[#5734DC] md:text-[24px] text-[20px]">
                        100
                      </span>
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardOne;
