import TData from "../../Components/Table/TData";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PaginationButtons from "../../Components/PaginationButton/PaginationButton";

const ClientWithdrawHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  const fetchPurchasePlan = async () => {
    const [withdrawHistoryResponse, clientListResponse, tokenListResponse] =
      await Promise.all([
        axiosInstance.get(
          `/admin/withdraw-history?per_page=${perPage}&page=${currentPage + 1}`
        ),
        axiosInstance.get(`/client-lists`),
        axiosInstance.get(`/deposit-tokens`),
      ]);

    return {
      withdrawHistory: withdrawHistoryResponse.data,
      clientLists: clientListResponse.data,
      tokenLists: tokenListResponse.data,
    };
  };

  const { data: withdraws, isLoading } = useQuery({
    queryKey: ["withdrawHistory", "clientLists", "tokenLists", currentPage],
    queryFn: fetchPurchasePlan,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const clientList = withdraws?.clientLists?.data;
  const tokenList = withdraws?.tokenLists[0];
  const withdrawHistory = withdraws?.withdrawHistory?.data?.data;

  const totalWithdrawHistory = withdraws?.withdrawHistory?.data?.total || 0;
  const totalPages = Math.ceil(totalWithdrawHistory / perPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return formattedDate;
  };

  return (
    <>
      <div className="md:p-6 px-3 pt-4">
        {isLoading ? (
          <div className="mt-5">
            <Skeleton height={35} count={7} />
          </div>
        ) : (
          <>
            {withdrawHistory?.length !== 0 ? (
              <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4 rounded-t-xl">
                <div className="overflow-x-auto w-full">
                  <table className=" border-collapse w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA] text-secondary">
                        <th className="py-2 px-6 text-start  whitespace-nowrap rounded-tl-xl">
                          SL
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Date
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Client Name
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Transition History
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Wallet Address
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Token
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Withdrawal Charge
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Withdrawal Amount
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {withdrawHistory?.map((data: any, index: number) => (
                        <tr key={index}>
                          <TData className="px-6">
                            {index + 1 + perPage * currentPage}
                          </TData>
                          <TData className="px-6">
                            {data?.date ? formatDate(data?.date) : ""}
                          </TData>
                          <TData className="px-6">
                            {clientList
                              ?.filter(
                                (user: any) => user.id == data?.client_id
                              )
                              .map((user: any) => (
                                <div key={user.id}>
                                  <p>{user?.name}</p>
                                </div>
                              ))}
                          </TData>
                          <TData className="px-6">
                            {data?.txn_hash?.slice(0, 8)}...
                            {data?.txn_hash?.slice(-4)}
                          </TData>
                          <TData className="px-6">
                            {data?.wallet_address?.slice(0, 8)}...
                            {data?.wallet_address?.slice(-4)}
                          </TData>
                          <TData className="px-6">
                            {tokenList
                              ?.filter(
                                (token: any) => token.id == data?.token_id
                              )
                              .map((token: any) => (
                                <div key={token.id}>
                                  <p>{token?.token_name}</p>
                                </div>
                              ))}
                          </TData>
                          <TData className="px-6">${data?.charge}</TData>
                          <TData className="px-6">${data?.amount}</TData>
                          <TData className="px-6">
                            {data?.status !== "approved" ? (
                              <div className="bg-red-200 w-[100px] text-center px-3 py-1 rounded-lg  text-red-500">
                                <span>Pending</span>
                              </div>
                            ) : (
                              <div className="bg-green-200 text-center w-[100px] px-3 py-1 rounded-lg  text-green-500">
                                <span>Appoved</span>
                              </div>
                            )}
                          </TData>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              "User hasn't any purchase plan"
            )}
          </>
        )}
      </div>

      {totalWithdrawHistory > 10 ? (
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ClientWithdrawHistory;
