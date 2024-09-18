import { RxCross1 } from "react-icons/rx";
import Form from "../../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoaingAnimation from "../../Loading/LoaingAnimation";
import LoadingButton from "../../Loading/LoadingButton";
import InputField from "../../Forms/InputField";
import { usePostAction } from "../../../utils/PostAction/PostAction";
import { useState } from "react";
import Swal from "sweetalert2";
import SelectField from "../../Forms/SelecetField";

export const option = [
  { label: "Deactive", value: "0" },
  { label: "Active", value: "1" },
];

export const validationSchema = z.object({
  token_name: z.string().min(1, "this field is required"),
  token_symbol: z.string().min(1, "this field is required"),
  chain_id: z.string().min(1, "this field is required"),
  contact_address: z.string().min(1, "this field is required"),
  image: z.string().optional(),
  status: z.string().min(1, "this field is required"),
});
export type IProps = {
  modal: boolean;
  handleModal: (e: any) => void;
  refetch: any;
  editToken: any;
};
const TokenEditModal = ({ handleModal, modal, refetch, editToken }: IProps) => {
  const { token_name, token_symbol, chain_id, contact_address, status } =
    editToken;
  const [image, setImage] = useState<File | undefined>(undefined);
  const { mutate, isPending } = usePostAction(
    "/deposit-token/update",
    refetch,
    handleModal
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const formSubmit: SubmitHandler<FieldValues> = async (tokenEdit) => {
    console.log("Form Values:", tokenEdit); // Check form values
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update data?",
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
      const data = new FormData();
      Object.keys(tokenEdit).forEach((key) => {
        data.append(key, tokenEdit[key] as any);
      });
      if (image) {
        data.append("image", image);
      }
      if (editToken) {
        data.append("id", editToken?.id);
      }
      mutate(data);
    }
  };

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
            <h4> Add New Coupon</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            {editToken ? (
              <Form
                onSubmit={formSubmit}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  token_name: token_name || "",
                  token_symbol: token_symbol || "",
                  chain_id: chain_id || "",
                  contact_address: contact_address || "",
                  image: "",
                  status: status || "",
                }}
              >
                <div className="md:w-11/12 w-full mx-auto">
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">
                      Token Name
                    </p>
                    <InputField
                      name="token_name"
                      type="text"
                      className="px-4"
                    />
                  </div>
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">
                      Token Symbol
                    </p>
                    <InputField
                      name="token_symbol"
                      type="text"
                      className="px-4"
                    />
                  </div>
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">
                      Chain Id
                    </p>
                    <InputField
                      name="chain_id"
                      type="number"
                      className="px-4"
                    />
                  </div>
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">
                      Contact Address
                    </p>
                    <InputField
                      name="contact_address"
                      type="text"
                      className="px-4"
                    />
                  </div>
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">image</p>
                    <InputField
                      name="image"
                      type="file"
                      className="px-4"
                      onChange={handleImageChange}
                    />
                  </div>{" "}
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">Status</p>
                    <SelectField
                      name="status"
                      options={option}
                      type="string"
                      required
                    />
                  </div>
                  <div className="w-full mt-6 border border-slate-300 rounded-lg">
                    {isPending ? (
                      <LoaingAnimation size={30} color="#36d7b7" />
                    ) : (
                      <LoadingButton className="w-full">Submit</LoadingButton>
                    )}
                  </div>
                </div>
              </Form>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenEditModal;
