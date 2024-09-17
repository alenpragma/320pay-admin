import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import AddNewCoupon from "../../Components/Modal/CouponModal/AddNewCoupon";
import CouponEditModal from "../../Components/Modal/CouponModal/CouponEditModal";
import axiosInstance from "../../utils/axiosConfig";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { handleDeleteFn } from "../../utils/DeleteAction/HandleDeleteFn";
import { useQuery } from "@tanstack/react-query";
import AddNewtoken from "../../Components/Modal/TokenModal/AddNewToken";
import TokenEditModal from "../../Components/Modal/TokenModal/TokenEditModal";

const fetchToken = async () => {
  const response = await axiosInstance.get("/deposit-tokens");
  return response;
};

const TokenSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [editToken, setEditToken] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleEditModal = (data: string) => {
    setEditToken(data);
    setShowEditModal(!showEditModal);
  };

  const {
    data: tokens,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchToken,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const coupon = tokens?.data[0];

  const handleDelete = (deleteId: string) => {
    const url = `/deposit-token/delete/${deleteId}`;
    handleDeleteFn(url, refetch);
  };

  return (
    <>
      <AddNewtoken modal={modal} handleModal={handleModal} refetch={refetch} />
       <TokenEditModal
        modal={showEditModal}
        handleModal={handleEditModal}
        refetch={refetch}
        editToken={editToken}
      />
      {isLoading ? (
        <div className="mt-5">
          <Skeleton count={7} height={50} />{" "}
        </div>
      ) : (
        <>
          {coupon?.length !== 0 ? (
            <div className="py-5 px-3">
              <div className="w-full flex justify-end">
                <button
                  onClick={handleModal}
                  className="px-4 py-1 bg-primary rounded-lg text-white font-medium"
                >
                  Add New token
                </button>
              </div>
              <TableBody>
                <table className=" border-collapse w-full">
                  <thead>
                    <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
                      <th className="py-2 px-6 text-start text-nowrap">
                        Token Name
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Token Symbol
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Contact Address
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Images
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Status
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {coupon?.map((token: any) => (
                      <tr key={token?.id}>
                        <TData className="px-6">{token?.token_name}</TData>
                        <TData className="px-6">{token?.token_symbol}</TData>
                        <TData className="px-6">
                          {token?.contact_address?.slice(0, 8)}{" "}
                          {token?.contact_address ? "..." : ""}{" "}
                          {token?.contact_address?.slice(-6)}
                        </TData>
                        <TData className="px-6">
                          <div className="size-12 rounded-full border border-slate-400">
                            <img
                              className="size-full rounded-full "
                              src={token?.image}
                              alt=""
                            />
                          </div>
                        </TData>
                        <TData className="px-6">
                          {token?.status !== "1" ? (
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
                          <div className="flex items-center gap-3">
                            <FiEdit
                              onClick={() => handleEditModal(token)}
                              className="size-5 text-primary cursor-pointer"
                            />{" "}
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(token?.id)}
                              className="size-5 text-red-500 cursor-pointer"
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
            <p>No coupon data</p>
          )}
        </>
      )}
    </>
  );
};

export default TokenSettings;
