import { FaCopy } from "react-icons/fa";
import { images, loading } from "../..";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils/Actions";
import { ethers } from "ethers";
import axiosInstance from "../../utils/axiosConfig";
import { PuffLoader } from "react-spinners";

const Deposit = () => {
  const handleCopy = (copy: string | null) => {
    copyToClipboard(copy);
  };

  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    const privateKey = wallet.privateKey;
    localStorage.setItem("address", address);
    localStorage.setItem("privateKey", privateKey);
    window.location.reload();
  };

  const [wallet, setWallet] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const getWallet = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/client-wallets");
      if (response?.data?.success === 200) {
        setWallet(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWallet();
  }, []);

  console.log(wallet?.client_wallet_address);

  return (
    <div className="md:p-8 pt-5">
      <div className="md:w-2/5 w-11/12 mx-auto ">
        {wallet ? (
          <div className="mt-5 border border-[#E2E2E9] rounded-2xl">
            <div className="py-2 bg-primary w-full rounded-t-2xl px-5">
              <span className="font-semibold text-white ">Wallet Address</span>
            </div>
            <div className="p-8 ">
              <div className="flex justify-center items-center">
                <img src={images.qrCode} alt="" />
              </div>
              <div className="">
                <p className="text-[14px]">Wallet Address</p>
                <div className="w-full  rounded-lg bg-[#91919131] flex justify-end items-center text-end">
                  <span className=" w-full text-[14px]  text-start pl-3 font-semibold">
                    {loading ? (
                      <div className="w-full flex justify-center items-center">
                        <PuffLoader size={30} />
                      </div>
                    ) : (
                      <>
                        {`${wallet?.client_wallet_address?.slice(
                          0,
                          18
                        )} .........${wallet?.client_wallet_address?.slice(
                          -6
                        )}`}{" "}
                      </>
                    )}
                  </span>
                  <span
                    onClick={() => handleCopy(wallet?.client_wallet_address)}
                    className="px-3 py-3 text-white bg-primary rounded-r-lg cursor-pointer"
                  >
                    <FaCopy />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={createWallet}
            className="w-full py-2 rounded-lg bg-gradient-to-r  to-[#5634dc7a] hover:via-[#5634dccd] from-[#5634dcd6] hover:bg-[#5634dc7a] text-white font-light text-[16px]"
          >
            Add Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Deposit;
