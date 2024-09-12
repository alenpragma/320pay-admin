import React from "react"
import TData from "../../Components/Table/TData"
import { MdContentCopy } from "react-icons/md"
import HoverTableItem from "../../lib/HoverTableItem"

const TableRow = () => {
  return (
    <>
      <tr className="border-b border-[#E2E2E9] text-[#616365]">
        <TData className="  px-6">
          <div className="flex items-center gap-3">
            <img className="w-10" src={token.image} alt="" />
            <span>USDT</span>
          </div>
        </TData>

        <TData className="px-3">
          <div className="relative">
            <div className="flex items-center">
              <span
                className="hover:bg-green-100 px-3 rounded"
                onMouseEnter={() => handleTras(history2)}
                onMouseLeave={() => handleTras(null)}
              >
                {history2.slice(0, 10)}
                .......
                {history.slice(-8)}
              </span>
              <MdContentCopy
                onClick={() => handleCopy(history2)}
                className="cursor-pointer rotate-180 size-5"
              />
            </div>
            {history2 == historyData ? <HoverTableItem value={history2} /> : ""}
          </div>
        </TData>
        <TData className="  px-6">
          <button
            className={`font-semibold text-[14px] ${
              isToggled0 ? "text-[#4FC55B]" : "text-[#FF8109]"
            } bg-[#DCF3DE] rounded py-1 w-[100px]   md:px-0 px-3`}
          >
            {isToggled0 ? "Active" : "Deactive"}
          </button>
        </TData>

        <TData className="  px-6">
          <div
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
              isToggled0 ? "bg-[#4FC55B]" : "bg-[#FF8109]"
            }`}
            onClick={() => handleToggle0()}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                isToggled0 ? "translate-x-6" : ""
              }`}
            ></div>{" "}
          </div>
        </TData>
      </tr>
    </>
  )
}

export default TableRow
