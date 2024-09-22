import TData from "../../Components/Table/TData";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";

const fetchPurchasePlan = async () => {
  const [purchaseHistoryResponse, clientListsResponse] = await Promise.all([
    axiosInstance.get(`/admin/purchase-history`),
    axiosInstance.get(`/client-lists`),
  ]);

  return {
    purchaseHistory: purchaseHistoryResponse.data,
    clientLists: clientListsResponse.data,
  };
};

const PurchasePlaneHistory = () => {
  const { data: purchasePlan, isLoading } = useQuery({
    queryKey: ["purchaseHistory", "clientLists"],
    queryFn: fetchPurchasePlan,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const userList = purchasePlan?.clientLists?.data;
  const purchase = purchasePlan?.purchaseHistory?.data;

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
            {purchase.length !== 0 ? (
              <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4">
                <div className="overflow-x-auto w-full">
                  <table className=" border-collapse w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA] text-secondary">
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          SL
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Purchase Date
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Client Name
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Client Email
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Domain
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Plan
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Amount
                        </th>
                        {/* <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Total Days
                        </th> */}
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {purchase?.map((data: any, index: number) => (
                        <tr key={index}>
                          <TData className="px-6">{index + 1}</TData>
                          <TData className="px-6">
                            {data?.created_at
                              ? formatDate(data.created_at)
                              : ""}
                          </TData>

                          <TData className="px-6">
                            {userList
                              ?.filter(
                                (user: any) => user.id == data?.client_id
                              )
                              .map((user: any) => (
                                <div key={user.id}>
                                  <p>{user?.name}</p>
                                </div>
                              ))}
                          </TData>
                          <TData className="px-6">{data?.client_email}</TData>
                          <TData className="px-6">{data?.domain_name}</TData>
                          <TData className="px-6">
                            {data?.package_name} Plan
                          </TData>
                          <TData className="px-6">${data?.package_price}</TData>
                          <TData className="px-6">
                            {data?.status !== "0" ? (
                              <div className="bg-red-200 w-[100px] text-center px-3 py-1 rounded-lg  text-red-500">
                                <span>Deactive</span>
                              </div>
                            ) : (
                              <div className="bg-green-200 text-center w-[100px] px-3 py-1 rounded-lg  text-green-500">
                                <span>Active</span>
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
    </>
  );
};

export default PurchasePlaneHistory;
