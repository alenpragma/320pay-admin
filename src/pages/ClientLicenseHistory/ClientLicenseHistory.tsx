import { useState } from "react";
import TData from "../../Components/Table/TData";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import PaginationButtons from "../../Components/PaginationButton/PaginationButton";

const ClientLicenseHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20;
  const fetchLicence = async () => {
    const response = await axiosInstance.get(
      `/admin/license-history?per_page=${perPage}&page=${currentPage + 1}`
    );
    return response;
  };

  const { data: license, isLoading } = useQuery({
    queryKey: ["coupons", currentPage],
    queryFn: fetchLicence,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const licenses = license?.data?.data?.data;
  const totalLicense = license?.data?.data?.total || 0;
  const totalPages = Math.ceil(totalLicense / perPage);

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

  const calculateTimeLeft = (endDate: string) => {
    if (!endDate) return null;

    const now = new Date();
    const end = new Date(endDate);
    const difference = end.getTime() - now.getTime();

    if (difference > 0) {
      return (
        <div className="bg-green-200 text-center w-[100px] px-3 py-1 rounded-lg  text-green-500">
          <span>Active</span>
        </div>
      );
    } else {
      return (
        <div className="bg-red-200 w-[100px] text-center px-3 py-1 rounded-lg  text-red-500">
          <span>Expired</span>
        </div>
      );
    }
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
            {licenses?.length !== 0 ? (
              <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4 rounded-t-xl">
                <div className="overflow-x-auto w-full">
                  <table className=" border-collapse w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA] text-secondary">
                        <th className="py-2 px-6 text-start  whitespace-nowrap rounded-tl-xl">
                          SL
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Domain Name
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Email
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Start Date
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Expire Date
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          License Key
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap rounded-tr-xl">
                          License Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {licenses?.map((data: any, index: number) => (
                        <tr key={index}>
                          <TData className="px-6">
                            {" "}
                            {index + 1 + currentPage * perPage}
                          </TData>
                          <TData className="px-6">{data?.domain_name}</TData>
                          <TData className="px-6">{data?.email}</TData>
                          <TData className="px-6">
                            {data?.start_date
                              ? formatDate(data?.start_date)
                              : ""}
                          </TData>
                          <TData className="px-6">
                            {data?.end_date ? formatDate(data?.end_date) : ""}
                          </TData>

                          <TData className="px-6">{data?.license_key}</TData>
                          <TData className="px-6">
                            {calculateTimeLeft(data?.end_date)}
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

      {totalLicense > 20 ? (
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

export default ClientLicenseHistory;
