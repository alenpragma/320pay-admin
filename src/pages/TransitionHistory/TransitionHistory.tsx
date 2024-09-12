import { Key, useEffect, useState } from "react";
import { tableData } from "../..";
import Pagination from "../../Components/Pagination/Pagination";
import Select, { SingleValue } from "react-select";
import axiosInstance from "../../utils/axiosConfig";
import TransactionRow from "./TransactionRow";
import { ITokenData, ITransaction } from "../../types/web3";
import Loading from "../../Components/Lottie/Loading";
import Skeleton from "react-loading-skeleton";

// const options = [
//   { value: "bnb", label: "BNB" },
//   { value: "btc", label: "BTC" },
//   { value: "usd", label: "USD" },
// ]

type OptionType = {
  id: number;
  label: string;
  value: string;
};
const TransitionHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [selectValue, setSelectValue] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState<ITokenData[]>([]);

  const [walletHistory, setWalletHistory] = useState<ITransaction[]>([]);

  const getDatas = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/client-tokens");
      if (response?.data?.data) {
        setTokenSymbol(response?.data?.data);
        setSelectValue(response?.data?.data[0]?.token_symbol);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  let options;
  if (tokenSymbol) {
    options = tokenSymbol?.map((item: ITokenData) => ({
      id: item.id,
      label: item?.token_symbol,
      value: item?.token_symbol,
    }));
  }

  const getTransactions = async (value: string) => {
    if (value) {
      setWalletHistory([]);
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `client/transactions?token_symbol=${value}`
        );
        if (response?.data.data.status === 0) {
          console.log("Data not found");
        }
        if (
          response?.data.success === 200 &&
          Array.isArray(response?.data.data)
        ) {
          setWalletHistory(response?.data.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching transactions:", error);
      }
    }
  };

  useEffect(() => {
    if (selectValue && tokenSymbol) {
      getTransactions(selectValue);
    }
  }, [selectValue, tokenSymbol]);

  const handleChange = (newValue: SingleValue<OptionType>) => {
    if (newValue) {
      setSelectValue(newValue.label);
      getTransactions(newValue.label);
    }
  };
  const [wallet, setWallet] = useState<any>("");

  const getWallet = async () => {
    try {
      const response = await axiosInstance.get("/client-wallets");
      if (response?.data?.success === 200) {
        setWallet(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };
  useEffect(() => {
    getWallet();
  }, []);

  return (
    <>
      <div className="md:p-6 px-3 pt-4">
        {loading == true ? (
          <div>
            <Skeleton height={35} count={7} />
          </div>
        ) : (
          <>
            {walletHistory.length !== 0 ? (
              <>
                <div className="flex justify-start">
                  <div>
                    <Select
                      options={options}
                      classNamePrefix="custom-select"
                      placeholder="Select Here"
                      defaultInputValue={selectValue ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4">
                  <div className="overflow-x-auto w-full">
                    <table className=" border-collapse w-full">
                      <thead>
                        <tr className="bg-[#FAFAFA] text-[#616365]">
                          <th className="py-2 px-6 text-start">Date</th>
                          <th className="py-2 px-6 text-start">
                            Transaction Hash
                          </th>
                          <th className="py-2 px-6 text-start">Amount</th>
                          <th className="py-2 px-6 text-start">From Wallet</th>
                          <th className="py-2 px-6 text-start">To Wallet</th>
                          <th className="py-2 px-6 text-start">Status</th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        {walletHistory?.map((data: ITransaction, i: Key) => (
                          <TransactionRow
                            key={i}
                            data={data}
                            selectValue={selectValue}
                            wallet={wallet?.client_wallet_address}
                          />
                        ))}
                      </tbody>
                    </table>
                    {loading && (
                      <div className="mx-auto flex justify-center">
                        {" "}
                        <Loading />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p>User hasn't transition history</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TransitionHistory;
