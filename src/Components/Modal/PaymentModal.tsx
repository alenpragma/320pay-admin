import { RxCross1 } from "react-icons/rx";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import SelectField from "../Forms/SelecetField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import Loading from "../Lottie/Loading";
import axiosInstance from "../../utils/axiosConfig";

type IModal = {
  handleRenewModal: () => void;
  renewModal: boolean;
};

export const validationSchema = z.object({
  currency: z.number().min(1, "This field is required"),
  network: z.number().optional(),
});

// export const validationSchemaDomain = z.object({
//   item: z.string().optional(),
// })

const PaymenModal = ({ handleRenewModal, renewModal }: IModal) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [availableTokens, setAvailableTokens] = useState([]);
  const [rpcData, setRpcData] = useState([]);

  // console.log(availableTokens);

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
      console.log(response?.data);

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
    value: item.id,
    image: item.image,
  }));

  const tokens = rpcData?.map((item: any) => ({
    label: item?.token_symbol,
    value: item.id,
    image: item.image,
  }));

  const handleCurrencyChange = (value: string) => {
    const selectedToken = availableTokens.find((token: any) => {
      return token.id === value;
    });
    setSelectedCurrency(selectedToken);
  };

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    handleRenewModal();
    return;
    // setLoading(true);
    // const data = {
    //   token_id: selectedCurrency.id,
    // };

    // const response = await axiosInstance.post("/client-token/store", data);
    // if (response.data.success == 200) {
    //   setLoading(false);
    //   toast.success("Successfuly added currency");
    //   handleRenewModal();
    // }
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
        className={`fixed bg-[#ffffff] md:w-5/12 w-11/12 h-fit m-auto right-0 left-0 top-0 bottom-20 rounded  ${
          renewModal ? " opacity-100 z-[101]" : "opacity-0 -z-[102]"
        }`}
      >
        <div className="w-full h-full rounded">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4> Add New Currency</h4>
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
                currency: undefined,
                network: undefined,
              }}
            >
              <div className="md:w-10/12 w-full mx-auto">
                <div className="relative mb-8">
                  <p className="font-semibold text-secondary mb-2">
                    Choose Network
                  </p>
                  <SelectField
                    name="network"
                    className=""
                    options={currencys}
                    placeholder="Please select an option"
                    onChange={handleCurrencyChange}
                    type="string"
                  />
                </div>
                <div className="relative mb-8">
                  <p className="font-semibold text-secondary mb-2">
                    Choose Currency
                  </p>
                  <SelectField
                    name="currency"
                    className=""
                    options={tokens}
                    placeholder="Please select an option"
                    type="string"
                  />
                  {/* <div className="relative">
                    <InputField
                      name="network"
                      type="text"
                      defaultValue={
                        selectedCurrency && selectedCurrency?.rpc_chain
                      }
                      className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1 pl-10 pr-4"
                    />
                    <img
                      className="absolute w-6 top-1 my-auto left-2 text-slate-500 text-[20px] cursor-pointer"
                      src={selectedCurrency?.image}
                      alt=""
                    />
                  </div> */}
                  {/* <SelectIcon /> */}
                </div>

                <div className="flex justify-center items-center">
                  {loading ? (
                    <button className="px-5 rounded-xl bg-[#5634dc93] text-white font-semibold w-[90%] flex justify-center items-center cursor-not-allowed">
                      <Loading />
                    </button>
                  ) : (
                    <button className="px-5 py-3 rounded-xl bg-primary text-white font-semibold w-[90%]">
                      Submit
                    </button>
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

export default PaymenModal;
