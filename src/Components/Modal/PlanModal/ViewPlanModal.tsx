import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IProps } from "./AddNewPlanModal";

const ViewPlanModal = ({ handleModal, modal }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="w-full">
      <div
        className={` ${
          modal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto"
            : "opacity-0 -z-50"
        }`}
        onClick={handleModal}
      ></div>
      <div
        className={`fixed  md:w-2/5 w-full h-fit m-auto right-0 left-0 top-0 rounded px-3 ${
          modal
            ? "bottom-10 opacity-100  duration-300 z-[101]"
            : "bottom-0 opacity-0 duration-300 pointer-events-none"
        }`}
      >
        <div className="w-full h-full rounded bg-[#ffffff] ">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Starter Package</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className=" pb-10 pt-8 max-h-[500px] overflow-auto">
            <div className=" border-b border-slate-300 pb-3 pt-3">
              <div className="flex justify-between items-center px-5">
                <span className="text-csecondary font-medium">
                  Package Name
                </span>
                <span className="text-cslate">Starter</span>
              </div>
            </div>
            <div className=" border-b border-slate-300 pb-3 pt-3">
              <div className="flex justify-between items-center px-5">
                <span className="text-csecondary font-medium">
                  Package Price
                </span>
                <span className="text-cslate">$100</span>
              </div>
            </div>
            <div className=" border-b border-slate-300 pb-3 pt-3">
              <div className="flex justify-between items-center px-5">
                <span className="text-csecondary font-medium">
                  Package Duration
                </span>
                <span className="text-cslate">1 Month</span>
              </div>
            </div>
            <div className=" border-b border-slate-300 pb-3 pt-3">
              <div className="flex justify-between items-center px-5">
                <span className="text-csecondary font-medium">Saving</span>
                <span className="text-cslate">10%</span>
              </div>
            </div>
            <div className=" border-b border-slate-300 pb-3 pt-3">
              <div className="flex justify-between items-center px-5">
                <span className="text-csecondary font-medium">
                  Sort Description
                </span>
                <span className="text-cslate">
                  Essential Feature Made Affordable
                </span>
              </div>
            </div>
            <div className=" border-b border-slate-300 pb-3 pt-3">
              <div className="flex justify-between px-5">
                <span className="text-csecondary font-medium">
                  Long Description
                </span>
                <span className="text-cslate max-w-[32ch]">
                  Essential Feature Made Affordable And Very Easy, Cheap Rate,
                  User Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPlanModal;
