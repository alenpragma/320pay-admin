import { images } from "../..";

import Skeleton from "react-loading-skeleton";
import axiosInstance from "../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const DashboardCardOne = () => {


  const fetchClient = async () => {
    const response = await axiosInstance.get("/client-lists");
    return response;
  };
  const {
    data: clients,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClient,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const totalClients = clients?.data?.total;
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="md:p-5 p-1 rounded-xl border-2 border-[#E2E2E9] relative px-2">
          <div className="flex items-center gap-5 pt-8 md:pt-0 w-full">
            <div className="w-fit">
              <div className="md:size-[70px] size-[32px] bg-[#E8E2FD] flex justify-center items-center rounded-full">
                <img className=" md:size-[40px]" src={images.profile} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <h4 className="text-[#616365] font-medium md:text-[24px] text-[12px]">
                All Clients
              </h4>
              <span className="md:text-[28px] text-[12px] font-medium text-[#313436] w-full">
                <div>
                  {isLoading ? (
                    <div className="w-full">
                      <Skeleton
                        height={40}
                        count={1}
                        highlightColor="#F4F5F6"
                      />
                    </div>
                  ) : (
                    <p className="flex justify-between items-center">
                      <span className="text-[#5734DC] md:text-[24px] text-[20px]">
                        {totalClients}
                      </span>
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="md:p-5 p-1 rounded-xl border-2 border-[#E2E2E9] relative px-2">
          <div className="flex items-center gap-5 pt-8 md:pt-0 w-full">
            <div className="w-fit">
              <div className="md:size-[70px] size-[32px] bg-[#E8E2FD] flex justify-center items-center rounded-full">
                <img className=" md:size-[40px]" src={images.wallet2} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <h4 className="text-[#616365] font-medium md:text-[24px] text-[12px]">
                Deposit
              </h4>
              <span className="md:text-[28px] text-[12px] font-medium text-[#313436] w-full">
                <div>
                  {isLoading ? (
                    <div className="w-full">
                      <Skeleton
                        height={40}
                        count={1}
                        highlightColor="#F4F5F6"
                      />
                    </div>
                  ) : (
                    <p className="flex justify-between items-center">
                      <span className="text-[#5734DC] md:text-[24px] text-[20px]">
                        100
                      </span>
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="md:p-5 p-1 rounded-xl border-2 border-[#E2E2E9] relative px-2">
          <div className="flex items-center gap-5 pt-8 md:pt-0 w-full">
            <div className="w-fit">
              <div className="md:size-[70px] size-[32px] bg-[#E8E2FD] flex justify-center items-center rounded-full">
                <img className=" md:size-[40px]" src={images.wallet1} alt="" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <h4 className="text-[#616365] font-medium md:text-[24px] text-[12px]">
                Withdraw
              </h4>
              <span className="md:text-[28px] text-[12px] font-medium text-[#313436] w-full">
                <div>
                  {isLoading ? (
                    <div className="w-full">
                      <Skeleton
                        height={40}
                        count={1}
                        highlightColor="#F4F5F6"
                      />
                    </div>
                  ) : (
                    <p className="flex justify-between items-center">
                      <span className="text-[#5734DC] md:text-[24px] text-[20px]">
                        100
                      </span>
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardOne;
