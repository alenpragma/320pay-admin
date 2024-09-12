import { RxCross1 } from "react-icons/rx";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import SelectField from "../Forms/SelecetField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectIcon from "../SelectIcon/SelectIcon";
import { useState } from "react";
import Loading from "../Lottie/Loading";
import LoaingAnimation from "../Loading/LoaingAnimation";
import LoadingButton from "../Loading/LoadingButton";

type IModal = {
  handleRenewModal: () => void;
  renewModal: boolean;
};

export const monthName = [
  { name: "1 Month" },
  { name: "2 Month" },
  { name: "3 Month" },
  { name: "6 Month" },
  { name: "12 Month" },
];
export const validationSchema = z.object({
  month: z.string().min(1, "This field is required"),
});

const Renew = ({ handleRenewModal, renewModal }: IModal) => {
  const [loading, setLoading] = useState<boolean>(false);
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="w-full ">
      <div
        className={` ${
          renewModal
            ? " opacity-100   fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto"
            : "opacity-0 -z-50"
        }`}
        onClick={handleRenewModal}
      ></div>
      <div
        className={`fixed bg-[#ffffff] md:w-6/12 w-11/12 h-fit m-auto right-0 left-0 top-0 bottom-20 rounded  ${
          renewModal ? " opacity-100 z-[101]" : "opacity-0 -z-[102]"
        }`}
      >
        <div className="w-full h-full rounded">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Update Licenses</h4>
            <RxCross1
              onClick={handleRenewModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 md:pb-20 pb-8 pt-8">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                month: "",
              }}
            >
              <div className="flex justify-between items-center text-secondary py-3  border-b border-b-[#E2E2E9]">
                <span className="text-[18px] text-[#616365] font-semibold">
                  Domain Name
                </span>{" "}
                <span className="text-[16px]">web320.com</span>
              </div>
              <div className="flex justify-between items-center text-secondary py-3  border-b border-b-[#E2E2E9]">
                <span className="text-[18px] text-[#616365] font-semibold">
                  Licenses
                </span>{" "}
                <span className="text-[16px]">UHga87667#76380</span>
              </div>
              <div className="flex justify-between items-center text-secondary py-3  border-b border-b-[#E2E2E9]">
                <span className="text-[18px] text-[#616365] font-semibold">
                  Choose Plan
                </span>{" "}
                <div className="relative">
                  <SelectField
                    name="month"
                    className="appearance-none px-2 pr-8 py-2 rounded border border-slate-300 focus:outline focus:outline-slate-400 bg-primary text-white font-medium w-full"
                    options={monthName}
                    placeholder="Please select an option"
                  />
                  <SelectIcon />
                </div>
              </div>
              <div className="flex justify-center items-center md:my-16 my-8 text-center w-full ">
                <p className="text-[#616365] font-semibold text-[18px]">
                  Price:
                </p>
                <h4 className="font-bold text-[24px] ml-5">
                  80 <span>$</span>
                </h4>
              </div>

              <div className="w-full mt-6 border border-slate-300 rounded-lg">
                {loading ? (
                  <LoaingAnimation size={30} color="#36d7b7" />
                ) : (
                  <LoadingButton className="w-full">Submit</LoadingButton>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renew;
