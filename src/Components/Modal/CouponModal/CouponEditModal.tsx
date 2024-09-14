import { RxCross1 } from "react-icons/rx";
import Form from "../../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import SelectField from "../../Forms/SelecetField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosConfig";
import LoaingAnimation from "../../Loading/LoaingAnimation";
import LoadingButton from "../../Loading/LoadingButton";
import InputField from "../../Forms/InputField";
import Swal from "sweetalert2";

export const option = [
  { label: "Deactive", value: "0" },
  { label: "Active", value: "1" },
];

export const validationSchema = z.object({
  coupon_name: z.string().min(1, "This field is required"),
  validity: z.string().min(1, "This field is required"),
  percentage: z.string().min(1, "This field is required"),
  visible_status: z.string().min(1, "This field is required"),
});
export type IProps = {
  modal: boolean;
  handleModal: (id: string) => void;
  getData: any;
  editCoupon?: any;
};
const CouponEditModal = ({
  handleModal,
  modal,
  getData,
  editCoupon,
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const formSubmit: SubmitHandler<FieldValues> = async (couponData) => {
    setLoading(true);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be update data?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.post(`/coupon/update`, {
          ...couponData,
          id: editCoupon?.id,
        });
        if (response?.data?.success === 200) {
          Swal.fire({
            title: "Update",
            text: "Your data has been updated",
            icon: "success",
            customClass: {
              popup: "custom-swal-modal",
            },
          });
          handleModal("0");
          setLoading(false);
        }
        getData();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "something wont worng",
          icon: "error",
          customClass: {
            popup: "custom-swal-modal",
          },
        });
        getData();
        setLoading(false);
      }
    }
  };
  return (
    <div className="w-full">
      <div
        className={` ${
          modal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto "
            : "opacity-0 -z-50"
        }`}
        onClick={() => handleModal("0")}
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
            <h4>Update Coupon</h4>
            <RxCross1
              onClick={() => handleModal("0")}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                coupon_name: "",
                percentage: "",
                validity: "",
                visible_status: "",
              }}
            >
              <div className="md:w-11/12 w-full mx-auto">
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Coupon Name
                  </p>
                  <InputField name="coupon_name" type="text" className="px-4" />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Coupon Validity (Days)
                  </p>
                  <InputField
                    name="validity"
                    type="text"
                    className="px-4"
                    placeholder="Enter Your Package Price"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Coupon Percentage
                  </p>
                  <InputField
                    name="percentage"
                    type="number"
                    className="px-4"
                    placeholder="%"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Coupon Status
                  </p>
                  <SelectField
                    name="visible_status"
                    options={option}
                    placeholder="Please select an option"
                    type="string"
                    required
                  />
                </div>

                <div className="w-full mt-6 border border-slate-300 rounded-lg">
                  {loading ? (
                    <LoaingAnimation size={30} color="#36d7b7" />
                  ) : (
                    <LoadingButton className="w-full">Submit</LoadingButton>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponEditModal;
