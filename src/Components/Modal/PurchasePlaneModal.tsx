import { useState } from "react";
import { images } from "../..";
import { copyToClipboard } from "../../utils/Actions";
import { FaCopy } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export type IPurchasPlane = {
  domain_name: string;
  date: string;
  package_id: string;
  package_name: string;
  package_price: string;
  updated_at: string;
};

type IModal = {
  handleModal: (data: any) => void;
  modal: boolean;
  singleData: any;
};

const PurchasePlaneModal = ({ handleModal, modal, singleData }: IModal) => {
  console.log(singleData);

  const [textToCopy, setTextToCopy] = useState<string>("");
  const handleCopy = (copy: string) => {
    copyToClipboard(textToCopy);
    setTextToCopy(copy);
  };
  const copy = "eeeee";
  return (
    <div className="w-full ">
      <div
        className={` ${
          modal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto"
            : "opacity-0 -z-50"
        }`}
        onClick={handleModal}
      ></div>
      <div
        className={`fixed bg-[#ffffff] w-2/5 h-fit m-auto right-0 left-0 top-0  rounded  ${
          modal
            ? "bottom-10 opacity-100  duration-300 z-[110]"
            : "bottom-0 opacity-0 duration-300 pointer-events-none"
        }`}
      >
        <div className="w-full h-full rounded">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Licenses Datils</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-20 pt-8">
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Expiry</span>{" "}
              <span className="text-[16px]">{singleData?.date}</span>
            </div>
            {/* <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Order Id</span>{" "}
              <span className="text-[16px]"></span>
            </div> */}
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Domain Name</span>{" "}
              <span className="text-[16px]">{singleData?.domain_name}</span>
            </div>
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Plan </span>{" "}
              <span className="text-[16px]">{singleData?.package_name}</span>
            </div>
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Price </span>{" "}
              <span className="text-[16px]">${singleData?.package_price}</span>
            </div>
            <div className="flex justify-between text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">
                Scan Licenses QR
              </span>{" "}
              <span className="text-[16px]">
                <img className="size-24" src={images.qrCode} alt="" />
              </span>
            </div>
            <div className="w-full mt-4">
              <div className=" rounded-lg bg-[#91919131] flex  items-center text-end justify-between">
                <span className=" w-4/5 text-[14px]  text-start pl-3 font-semibold">
                  0x625336E4A6C4cCa4....852A668ad3a3fA
                </span>
                <span
                  onClick={() => handleCopy(copy)}
                  className=" text-white bg-primary rounded-r-lg cursor-pointer flex items-center  w-1/5 py-3 px-2 gap-2"
                >
                  <p>Copy Licence</p>
                  <FaCopy />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePlaneModal;
