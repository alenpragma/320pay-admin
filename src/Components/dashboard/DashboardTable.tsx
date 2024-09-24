import TData from "../Table/TData";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";

const fetchLastSession = async () => {
  const response = await axiosInstance.get("/user-last-sessions");
  return response;
};

const DashboardTable = () => {
  const { data: lastSessions, isLoading } = useQuery({
    queryKey: ["lastSessions"],
    queryFn: fetchLastSession,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const lastSession = lastSessions?.data?.sessions?.data;
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
      {isLoading ? (
        <div className="mt-5">
          <Skeleton height={45} count={5} />
        </div>
      ) : (
        <>
          {lastSession?.length !== 0 ? (
            <div className="rounded-xl border-2 border-[#E2E2E9] pb-4">
              <h4 className="text-[24px] font-semibold p-4 text-[#959799]">
                Last Login Sessions
              </h4>
              <div className="overflow-x-auto w-full">
                <table className="overflow-x-auto border-collapse w-full">
                  <thead>
                    <tr className="bg-[#FAFAFA] text-[#616365]">
                      <th className="py-2 px-6 text-start">Location</th>
                      <th className="py-2 px-6 text-start">Device</th>
                      <th className="py-2 px-6 text-start">IP Address</th>
                      <th className="py-2 px-6 text-start">ISP</th>
                      <th className="py-2 px-6 text-start">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {lastSession?.map((item: any, i: number) => (
                      <tr key={i} className="border-b border-[#E2E2E9]">
                        <TData className="px-6">
                          {item?.city}, {item?.country}
                        </TData>
                        <TData className="px-6">{item?.device}</TData>
                        <TData className="px-6">{item?.last_login_ip}</TData>
                        <TData className="px-6">{item?.isp}</TData>
                        <TData className="px-6">
                          {" "}
                          {item?.created_at
                            ? formatDate(item?.created_at)
                            : "N/A"}
                        </TData>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No Data</p>
          )}
        </>
      )}
    </>
  );
};

export default DashboardTable;
