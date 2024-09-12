import { RxCross1 } from "react-icons/rx";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import SelectField from "../Forms/SelecetField";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, z } from "zod";
import { useEffect, useState } from "react";
import Loading from "../Lottie/Loading";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import LoaingAnimation from "../Loading/LoaingAnimation";
import LoadingButton from "../Loading/LoadingButton";

export const validationSchema = z.object({
  network: z.string().min(1, "select any network"),
  currency: z.string().min(1, "select any network"),
});
export type IProps = {
  modal: boolean;
  handleModal: () => void;
};
const PaymentModal2 = ({ handleModal, modal }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [availableTokens, setAvailableTokens] = useState([]);
  const [rpcData, setRpcData] = useState([]);

  const getDatas = async () => {
    const response = await axiosInstance.get("/client/rpc-urls");
    if (response?.data?.chains) {
      setAvailableTokens(response?.data?.chains);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  const getRPCDatas = async (id: any) => {
    if (id) {
      const response = await axiosInstance.get(
        `/client/rpc-wise-tokens?chain_id=${id}`
      );

      if (response?.data?.tokens) {
        setRpcData(response?.data?.tokens);
      }
    }
  };

  useEffect(() => {
    if (selectedCurrency) {
      getRPCDatas(selectedCurrency?.id);
    }
  }, [selectedCurrency]);

  const currencys = availableTokens?.map((item: any) => ({
    label: item?.rpc_chain,
    value: item?.id?.toString(),
    image: item.image,
  }));

  const tokens = rpcData?.map((item: any) => ({
    label: item?.token_symbol,
    value: item?.id?.toString(),
    image: item.image,
  }));

  const handleCurrencyChange = (value: string) => {
    const selectedToken = availableTokens.find((token: any) => {
      return token.id == value;
    });
    setSelectedCurrency(selectedToken);
  };

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const tokenData = {
      token_id: data.network,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/client-token/store",
        tokenData
      );
      console.log(response.data);

      if (response.data.success == 200) {
        setLoading(false);
        toast.success("Successfuly added currency");
      }
      if (response.data.success != 200) {
        setLoading(false);
        toast.error(response?.data?.message);
      }
      handleModal();
    } catch (error) {
      console.log(error);
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
        <div className="w-full h-full rounded bg-[#ffffff]">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4> Add New Currency</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                currency: "",
                network: "",
              }}
            >
              <div className="md:w-10/12 w-full mx-auto">
                <div className="relative mb-8">
                  <p className="font-semibold text-secondary mb-2">
                    Choose Network
                  </p>
                  <SelectField
                    name="network"
                    options={currencys}
                    placeholder="Please select an option"
                    onChange={handleCurrencyChange}
                    type="string"

                    // value={'selectedCurrency'}
                  />
                </div>
                <div className="relative mb-8">
                  <p className="font-semibold text-secondary mb-2">
                    Choose Currency
                  </p>
                  <SelectField
                    name="currency"
                    options={tokens}
                    onChange={handleCurrencyChange}
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

export default PaymentModal2;
