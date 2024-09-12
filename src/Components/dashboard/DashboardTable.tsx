import { useEffect, useState } from "react";
import { tableData } from "../..";
import TData from "../Table/TData";
import Pagination from "../Pagination/Pagination";
import axiosInstance from "../../utils/axiosConfig";
import { formatToLocalDate } from "../../hooks/formatDate";
import PaginationButtons from "../PaginationButton/PaginationButton";
import Skeleton from "react-loading-skeleton";

const DashboardTable = () => {
  const [lastSessions, setLastSessions] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user-last-sessions");
      // console.log(response)
      if (response?.data?.success == 200) {
        setLastSessions(response?.data?.sessions?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="rounded-xl border-2 border-[#E2E2E9] pb-4">
        <h4 className="text-[24px] font-semibold p-4 text-[#959799]">
          Last Login Sessions
        </h4>

        {loading ? (
          <Skeleton height={45} count={5} />
        ) : (
          <>
            {lastSessions?.length !== 0 ? (
              <div className="overflow-x-auto w-full">
                <table className="overflow-x-auto border-collapse w-full">
                  <thead>
                    <tr className="bg-[#FAFAFA] text-[#616365]">
                      <th className="py-2 px-6 text-start">Location</th>
                      <th className="py-2 px-6 text-start">Status</th>
                      <th className="py-2 px-6 text-start">Device</th>
                      <th className="py-2 px-6 text-start">IP Address</th>
                      <th className="py-2 px-6 text-start">ISP</th>
                      <th className="py-2 px-6 text-start">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {lastSessions?.map((item: any, i) => (
                      <tr key={i} className="border-b border-[#E2E2E9]">
                        <TData
                          data={`${item?.city} ${item?.country}`}
                          className=" px-6"
                        />
                        <TData className=" px-6">
                          <span className="font-semibold text-[14px] text-green-500 bg-[#DCF3DE] rounded py-1 px-3">
                            Ok
                          </span>
                        </TData>
                        <TData data={item?.device} className=" px-6" />
                        <TData data={item?.last_login_ip} className=" px-6" />
                        <TData data={item?.isp} className=" px-6" />
                        <TData
                          data={formatToLocalDate(item?.created_at)}
                          className=" px-6"
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No Data</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardTable;
