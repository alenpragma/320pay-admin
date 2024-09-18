import TData from "../../Components/Table/TData";
import Form from "../../Components/Forms/Form";
import InputField from "../../Components/Forms/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { GoSearch } from "react-icons/go";
import TableBody from "../../Components/TableBody/TableBody";
import axiosInstance from "../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
export const validationSchema = z.object({
  search: z.string().min(3, "Please type minimum 3 word"),
});

const fetchToken = async () => {
  const response = await axiosInstance.get("/client-lists");
  return response;
};

const AllUser = () => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  const {
    data: allusers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: fetchToken,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const allUserData = allusers?.data?.data;

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
    <div className="py-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-cblack mb-5">
          Total User : {allUserData?.length}
        </h4>
        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            search: "",
          }}
        >
          <div className="relative md:w-[3d00px] w-full">
            <InputField
              name="search"
              type="text"
              className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
              placeholder="Search...."
            />
            <GoSearch className="absolute size-6 top-1 right-2 text-cslate" />
          </div>
        </Form>
      </div>
      {isLoading ? (
        <div className="mt-5">
          <Skeleton count={7} height={50} />{" "}
        </div>
      ) : (
        <>
          {allUserData?.length !== 0 ? (
            <TableBody>
              <table className=" border-collapse w-full">
                <thead>
                  <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
                    <th className="py-2 px-6 text-start rounded-tl-lg ">
                      SL No
                    </th>
                    <th className="py-2 px-6 text-start">Name</th>
                    <th className="py-2 px-6 text-start">Email</th>
                    <th className="py-2 px-6 text-start">Wallet</th>
                    <th className="py-2 px-6 text-start">Active Licence</th>
                    <th className="py-2 px-6 text-start rounded-tr-lg ">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {allUserData?.map((user: any, index: number) => (
                    <tr key={user?.id}>
                      <TData className="px-6">{index + 1}</TData>
                      <TData className="px-6">{user?.name}</TData>
                      <TData className="px-6">{user?.email}</TData>
                      <TData className="px-6">wallet</TData>
                      <TData className="px-6">
                        {user?.created_at ? formatDate(user.created_at) : "N/A"}
                      </TData>
                      <TData className="px-6">
                        {user?.activation_status !== "0" ? (
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
            </TableBody>
          ) : (
            <p>No Data</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllUser;
