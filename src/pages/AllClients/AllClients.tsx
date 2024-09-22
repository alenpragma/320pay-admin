// import TData from "../../Components/Table/TData";
// import Form from "../../Components/Forms/Form";
// import InputField from "../../Components/Forms/InputField";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, SubmitHandler } from "react-hook-form";

// import { GoSearch } from "react-icons/go";
// import TableBody from "../../Components/TableBody/TableBody";
// import axiosInstance from "../../utils/axiosConfig";
// import { useQuery } from "@tanstack/react-query";
// import Skeleton from "react-loading-skeleton";
// import { useState } from "react";
// import Pagination from "../../Components/PaginationButton/Pagination";
// // import Pagination from "../../Components/Pagination/Pagination";
// export const validationSchema = z.object({
//   search: z.string().min(3, "Please type minimum 3 word"),
// });

// const cache = new Map<number, any>();

// const fetchToken = async (page: number) => {
//   if (cache.has(page)) {
//     return cache.get(page);
//   }

//   const response = await axiosInstance.get(
//     `/client-lists?per_page=20&page=1`
//   );
//   cache.set(page, response);
//   return response;
// };

// const AllUser = () => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const formSubmit: SubmitHandler<FieldValues> = async (data) => {};
//   const { data: allusers, isLoading } = useQuery({
//     queryKey: ["allusers", currentPage],
//     queryFn: () => fetchToken(currentPage),
//     staleTime: 10000,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     retry: false,
//   });
//   const allUserData = allusers?.data?.data;
//   const total: number = allusers?.data?.total;
//   const pages = Array.from({ length: Math.ceil(total / 3) }, (_, i) => i + 1);
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//     return formattedDate;
//   };

//   return (
//     <>
//       <div className="py-6">
//         <div className="flex justify-between items-center">
//           <h4 className="font-medium text-cblack mb-5">
//             Total User : {allUserData?.length}
//           </h4>
//           <Form
//             onSubmit={formSubmit}
//             resolver={zodResolver(validationSchema)}
//             defaultValues={{
//               search: "",
//             }}
//           >
//             <div className="relative md:w-[3d00px] w-full">
//               <InputField
//                 name="search"
//                 type="text"
//                 className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
//                 placeholder="Search...."
//               />
//               <GoSearch className="absolute size-6 top-1 right-2 text-cslate" />
//             </div>
//           </Form>
//         </div>

//         <TableBody>
//           <table className=" border-collapse w-full">
//             <thead>
//               <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
//                 <th className="py-2 px-6 text-start rounded-tl-lg ">SL No</th>
//                 <th className="py-2 px-6 text-start">Name</th>
//                 <th className="py-2 px-6 text-start">Email</th>
//                 <th className="py-2 px-6 text-start">Wallet</th>
//                 <th className="py-2 px-6 text-start">Active Licence</th>
//                 <th className="py-2 px-6 text-start rounded-tr-lg ">Status</th>
//               </tr>
//             </thead>

//             <tbody className="bg-white">
//               {allUserData?.map((user: any, index: number) => (
//                 <tr key={user?.id}>
//                   <TData className="px-6">{index + 1}</TData>
//                   <TData className="px-6">{user?.name}</TData>
//                   <TData className="px-6">{user?.email}</TData>
//                   <TData className="px-6">wallet</TData>
//                   <TData className="px-6">
//                     {user?.created_at ? formatDate(user.created_at) : "N/A"}
//                   </TData>
//                   <TData className="px-6">
//                     {user?.activation_status !== "0" ? (
//                       <div className="bg-red-200 w-[100px] text-center px-3 py-1 rounded-lg  text-red-500">
//                         <span>Deactive</span>
//                       </div>
//                     ) : (
//                       <div className="bg-green-200 text-center w-[100px] px-3 py-1 rounded-lg  text-green-500">
//                         <span>Active</span>
//                       </div>
//                     )}
//                   </TData>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </TableBody>
//       </div>
//       {/* <Pagination
//         total={total}
//         fetchData={fetchToken}
//         pages={pages}
//         setCurrentPage={setCurrentPage}
//         currentPage={currentPage}
//         totalPages={totalPages}
//       /> */}
//     </>
//   );
// };

// export default AllUser;

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
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditClients from "../../Components/Modal/AllClients/EditClients";
import Pagination from "../../Components/PaginationButton/Pagination";
// import Pagination from "../../Components/Pagination/Pagination";
export const validationSchema = z.object({
  search: z.string().min(3, "Please type minimum 3 word"),
});

const cache = new Map<number, any>();

const fetchToken = async (page: number) => {
  if (cache.has(page)) {
    return cache.get(page);
  }

  const response = await axiosInstance.get(`/client-lists?per_page=20&page=1`);
  // cache.set(page, response);
  return response;
};

const AllClients = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [editClient, setEditClient] = useState("");
  const handleModal = (userData: any) => {
    setModal(!modal);
    setEditClient(userData);
  };
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {};
  const {
    data: allusers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allusers", currentPage],
    queryFn: () => fetchToken(currentPage),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const allUserData = allusers?.data?.data;
  const total: number = allusers?.data?.total;
  const pages = Array.from({ length: Math.ceil(total / 3) }, (_, i) => i + 1);
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
      <EditClients
        modal={modal}
        handleModal={handleModal}
        editClient={editClient}
        refetch={refetch}
      />
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

        <TableBody>
          <table className=" border-collapse w-full">
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
                <th className="py-2 px-6 text-start text-nowrap">Client Id</th>
                <th className="py-2 px-6 text-start text-nowrap">
                  Wallet Address
                </th>
                <th className="py-2 px-6 text-start text-nowrap">Secret Key</th>
                <th className="py-2 px-6 text-start text-nowrap">
                  Active Licence
                </th>
                <th className="py-2 px-6 text-start text-nowrap">
                  Created Date
                </th>
                <th className="py-2 px-6 text-start text-nowrap rounded-tr-lg ">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {allUserData?.map((user: any, index: number) => (
                <tr key={user?.id}>
                  <TData className="px-6">{index + 1}</TData>
                  <TData className="px-6">{user?.name}</TData>
                  <TData className="px-6">{user?.email}</TData>
                  <TData className="px-6">{user?.id}</TData>
                  <TData className="px-6">
                    {user?.client_wallet_address?.slice(0, 8)}...
                    {user?.client_wallet_address?.slice(-4)}
                  </TData>
                  <TData className="px-6">{user?.secret_key}</TData>
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
                  <TData className="px-6">
                    {user?.created_at ? formatDate(user.created_at) : "N/A"}
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
      {/* <Pagination
        total={total}
        fetchData={fetchToken}
        pages={pages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      /> */}
    </>
  );
};

export default AllClients;
