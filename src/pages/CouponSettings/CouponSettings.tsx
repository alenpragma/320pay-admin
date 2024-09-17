import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import AddNewCoupon from "../../Components/Modal/CouponModal/AddNewCoupon";
import CouponEditModal from "../../Components/Modal/CouponModal/CouponEditModal";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import { handleDeleteFn } from "../../utils/DeleteAction/HandleDeleteFn";
import { useQuery } from "@tanstack/react-query";

const fetchCoupon = async () => {
  const response = await axiosInstance.get("/coupons");
  return response;
};

const CouponSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [editCoupon, setEditCoupon] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleEditModal = (data: string) => {
    setEditCoupon(data);
    setShowEditModal(!showEditModal);
  };

  const {
    data: coupons,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupon,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const coupon = coupons?.data?.data;
  const handleDelete = (deleteId: string) => {
    const url = `/coupon/delete/${deleteId}`;
    handleDeleteFn(url, refetch);
  };

  return (
    <>
      <AddNewCoupon modal={modal} handleModal={handleModal} refetch={refetch} />
      <CouponEditModal
        modal={showEditModal}
        handleModal={handleEditModal}
        refetch={refetch}
        editCoupon={editCoupon}
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
                  Add New Coupon
                </button>
              </div>
              <TableBody>
                <table className=" border-collapse w-full">
                  <thead>
                    <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
                      <th className="py-2 px-6 text-start text-nowrap">
                        Coupon Name
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Coupon Code
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Coupon Validity
                      </th>
                      <th className="py-2 px-6 text-start text-nowrap">
                        Coupon Percentage
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
                    {coupon?.map((coup: any) => (
                      <tr key={coup?.id}>
                        <TData className="px-6">{coup?.coupon_name}</TData>
                        <TData className="px-6">{coup?.coupon_code}</TData>
                        <TData className="px-6">
                          <span className="text-primary font-medium">
                            {coup?.validity} days
                          </span>
                        </TData>
                        <TData className="px-6">{coup?.percentage}%</TData>
                        <TData className="px-6">
                          {coup?.visible_status !== "1" ? (
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
                              onClick={() => handleEditModal(coup)}
                              className="size-5 text-primary cursor-pointer"
                            />{" "}
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(coup?.id)}
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

export default CouponSettings;
