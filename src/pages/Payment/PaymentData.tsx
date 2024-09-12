import { useEffect, useState } from "react";
import TData from "../../Components/Table/TData";
import { PuffLoader } from "react-spinners";

const PaymentData = ({ handelUpdateStatus, loading, token, tokenId }: any) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle0 = (id: string, status: string) => {
    handelUpdateStatus(id, status);
    setIsToggled(!isToggled);
  };
  return (
    <>
      <tr className="border-b border-[#E2E2E9] text-[#616365]">
        <TData className="  px-6">
          <div className="flex items-center gap-3">
            <img className="w-10" src={token?.image} alt="" />
            <span>{token?.token_symbol}</span>
          </div>
        </TData>

        <TData className="  px-6">
          <div className="flex items-center gap-3">
            <span>{token?.rpc_chain}</span>
          </div>
        </TData>

        <TData className="  px-6">
          <button
            className={`font-semibold text-[14px] ${
              token?.status == 1 ? "text-[#4FC55B]" : "text-[#FF8109]"
            } bg-[#DCF3DE] rounded py-1 w-[100px] md:px-0 px-3`}
          >
            {token?.status == 1 ? "Active" : "Deactive"}
          </button>
        </TData>

        <TData className="px-6">
          {loading == true && tokenId === token.id ? (
            <PuffLoader size={40} />
          ) : (
            <div
              className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer relative ${
                token.status == 1 ? "bg-[#4FC55B]" : "bg-[#FF8109]"
              }`}
              onClick={() => handleToggle0(token.id, token.status)}
            >
              <div
                className={`bg-white size-7 rounded-full shadow-md duration-300 absolute ${
                  token.status == 0 ? "left-1" : "right-1"
                }`}
              ></div>
            </div>
          )}
        </TData>
      </tr>
    </>
  );
};

export default PaymentData;
