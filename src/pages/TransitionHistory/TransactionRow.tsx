import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import HoverTableItem from "../../lib/HoverTableItem";
import { copyToClipboard } from "../../utils/Actions";
import TData from "../../Components/Table/TData";
import { TiTick } from "react-icons/ti";

const TransactionRow = ({ data, selectValue, wallet }: any) => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  console.log(data);
  const handleMouseEnter = (field: string) => {
    setHoveredField(field);
  };

  const handleMouseLeave = () => {
    setHoveredField(null);
  };

  const [tranHas, setTranHas] = useState<string | null>("");
  const [walletFrom, setWalletFrom] = useState<string | null>("");
  const [walletTo, setWalletTo] = useState<string | null>("");

  const handleCopy = (
    copy: string | null,
    hashIdid: string | null,
    fromWallet: string | null,
    toWallet: string | null
  ) => {
    copyToClipboard(copy);
    setTranHas(hashIdid);
    setWalletFrom(fromWallet);
    setWalletTo(toWallet);
    setTimeout(() => {
      setTranHas(null);
      setWalletFrom(null);
      setWalletTo(null);
    }, 3000);
  };

  return (
    <>
      <tr className="border-b border-[#E2E2E9]">
        <TData data={data?.timestamp} className="px-6" />
        <TData className="px-3">
          <div className="relative">
            <div className="flex items-center gap-2">
              <span
                className="hover:bg-green-100 w-40 px-3 rounded"
                onMouseEnter={() => handleMouseEnter("hash")}
                onMouseLeave={handleMouseLeave}
              >
                {data.hash?.slice(0, 6)}
                ........
                {data.hash?.slice(-8)}
              </span>
              {tranHas !== data?.hash ? (
                <MdContentCopy
                  onClick={() => handleCopy(data?.hash, data?.hash, null, null)}
                  className="cursor-pointer rotate-180 size-6"
                />
              ) : (
                <TiTick className="size-6" />
              )}
            </div>
            {hoveredField === "hash" && <HoverTableItem value={data.hash} />}
          </div>
        </TData>
        <TData data={`${data?.value} ${selectValue}`} className="px-6" />

        <TData className="px-3">
          <div className="relative">
            <div className="flex items-center gap-2">
              <span
                className="hover:bg-green-100 px-3 rounded"
                onMouseEnter={() => handleMouseEnter("from")}
                onMouseLeave={handleMouseLeave}
              >
                {data.from?.slice(0, 10)}
                .......
                {data.from?.slice(-8)}
              </span>
              {walletFrom !== data?.from ? (
                <MdContentCopy
                  onClick={() => handleCopy(data?.from, null, data?.from, null)}
                  className="cursor-pointer rotate-180 size-6"
                />
              ) : (
                <TiTick className="size-6" />
              )}
            </div>
            {hoveredField === "from" && <HoverTableItem value={data.from} />}
          </div>
        </TData>
        <TData className="px-3">
          <div className="relative">
            <div className="flex items-center">
              <span
                className="hover:bg-green-100 px-3 rounded"
                onMouseEnter={() => handleMouseEnter("to")}
                onMouseLeave={handleMouseLeave}
              >
                {data.to?.slice(0, 10)}
                .......
                {data.to?.slice(-8)}
              </span>
              {walletTo !== data?.to ? (
                <MdContentCopy
                  onClick={() => handleCopy(data?.to, null, null, data?.to)}
                  className="cursor-pointer rotate-180 size-6"
                />
              ) : (
                <TiTick className="size-6" />
              )}
            </div>
            {hoveredField === "to" && <HoverTableItem value={data.to} />}
          </div>
        </TData>
        <TData className="px-6">
          <div className="w-14 text-center">
            {data?.to?.toLowerCase() === wallet?.toLowerCase() ? (
              <p className="text-green-500 bg-[#DCF3DE] rounded">in</p>
            ) : (
              <p className="text-red-500 bg-[#ff26262a] rounded">out</p>
            )}
          </div>
        </TData>
      </tr>
    </>
  );
};

export default TransactionRow;
