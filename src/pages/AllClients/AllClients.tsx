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
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditClients from "../../Components/Modal/AllClients/EditClients";
import PaginationButtons from "../../Components/PaginationButton/PaginationButton";
export const validationSchema = z.object({
  search: z.string().min(3, "Please type minimum 3 word"),
});

const AllClients = () => {
  const [modal, setModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [editClient, setEditClient] = useState("");
  const perPage = 20;
  const fetchToken = async () => {
    const response = await axiosInstance.get(
      `/client-lists?per_page=${perPage}&page=${currentPage + 1}`
    );
    return response;
  };

  const handleModal = (userData: any) => {
    setModal(!modal);
    setEditClient(userData);
  };

  const {
    data: allusers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allusers", currentPage],
    queryFn: fetchToken,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const allUserData = allusers?.data?.data || [];
  const totalUsers = allusers?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / perPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <EditClients
        modal={modal}
        handleModal={handleModal}
        editClient={editClient}
        refetch={refetch}
      />

      {isLoading ? (
        <div className="mt-5">
          <Skeleton height={50} count={7} />
        </div>
      ) : (
        <>
          {allUserData.length > 0 ? (
            <div className="py-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-cblack mb-5">
                  Total User: {totalUsers}
                </h4>
                {/* <Form
                  onSubmit={formSubmit}
                  resolver={zodResolver(validationSchema)}
                  defaultValues={{ search: "" }}
                >
                  <div className="relative md:w-[300px] w-full">
                    <InputField
                      name="search"
                      type="text"
                      className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
                      placeholder="Search...."
                    />
                    <GoSearch className="absolute size-6 top-1 right-2 text-cslate" />
                  </div>
                </Form> */}
              </div>

              <TableBody>
                <table className="border-collapse w-full">
                  <thead>
                    <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
                      <th className="py-2 px-6 text-start rounded-tl-lg text-nowrap">
                        SL No
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Client Name
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Client Email
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Client Id
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Wallet Address
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Private Key
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Active Licence
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Created Date
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap rounded-tr-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {allUserData.map((user: any, index: number) => (
                      <tr key={user?.id}>
                        <TData className="px-6">
                          {index + 1 + currentPage * perPage}
                        </TData>
                        <TData className="px-6">{user?.name}</TData>
                        <TData className="px-6">{user?.email}</TData>
                        <TData className="px-6">{user?.id}</TData>
                        <TData className="px-6">
                          {user?.client_wallet_address?.slice(0, 8)}...
                          {user?.client_wallet_address?.slice(-4)}
                        </TData>
                        <TData className="px-6">{user?.secret_key}</TData>
                        <TData className="px-6">
                          {/* {user?.activation_status !== "0" ? (
                            <div className="bg-red-200 w-[100px] text-center px-3 py-1 rounded-lg text-red-500">
                              <span>Deactive</span>
                            </div>
                          ) : (
                            <div className="bg-green-200 text-center w-[100px] px-3 py-1 rounded-lg text-green-500">
                              <span>Active</span>
                            </div>
                          )} */}
                          3 Active License
                        </TData>
                        <TData className="px-6">
                          {user?.created_at
                            ? formatDate(user.created_at)
                            : "N/A"}
                        </TData>
                        <TData className="px-6">
                          <div className="flex items-center gap-3">
                            <FiEdit
                              onClick={() => handleModal(user)}
                              className="size-5 text-primary cursor-pointer"
                            />
                          </div>
                        </TData>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableBody>
            </div>
          ) : (
            "no data"
          )}
        </>
      )}
      {totalUsers > 20 ? (
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

export default AllClients;
