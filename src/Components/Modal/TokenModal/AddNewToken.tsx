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
import axiosInstance from "../../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import SelectField from "../../Forms/SelecetField";

export const validationSchema = z.object({
  token_name: z.string().min(1, "this field is required"),
  token_symbol: z.string().min(1, "this field is required"),
  chain_id: z.string().min(1, "this field is required"),
  contact_address: z.string().min(1, "this field is required"),
  image: z.string().min(1, "this field is required"),
});
export type IProps = {
  modal: boolean;
  handleModal: () => void;
  refetch: any;
};

const fetchChain = async () => {
  const response = await axiosInstance.get("/rpc-urls");
  return response?.data[0];
};

const AddNewtoken = ({ handleModal, modal, refetch }: IProps) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const { mutate, isPending } = usePostAction(
    "/deposit-token/store",
    refetch,
    handleModal
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const formSubmit: SubmitHandler<FieldValues> = (tokenData) => {
    const data = new FormData();
    Object.keys(tokenData).forEach((key) => {
      data.append(key, tokenData[key]);
    });
    if (image) {
      data.append("image", image);
    }
    mutate(data);
  };

  const { data: chain } = useQuery({
    queryKey: ["chain"],
    queryFn: fetchChain,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const currency = chain?.map((e: any) => ({
    label: e?.rpc_chain,
    value: e?.chain_id,
  }));
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
            <h4> Add New Token</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                token_name: "",
                token_symbol: "",
                chain_id: "",
                contact_address: "",
                image: "",
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
                    placeholder="Token Name"
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
                    placeholder="Token Symbol"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">Chain Id</p>
                  <SelectField
                    name="chain_id"
                    options={currency}
                    placeholder="Please select an option"
                    type="string"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Contract Address
                  </p>
                  <InputField
                    name="contact_address"
                    type="text"
                    className="px-4"
                    placeholder="Contract Address"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">image</p>
                  <InputField
                    name="image"
                    type="file"
                    className="px-4"
                    placeholder="Enter Your Package Price"
                    onChange={handleImageChange}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewtoken;
