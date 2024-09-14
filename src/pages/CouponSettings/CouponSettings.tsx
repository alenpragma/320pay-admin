import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import AddNewCoupon from "../../Components/Modal/CouponModal/AddNewCoupon";
import CouponEditModal from "../../Components/Modal/CouponModal/CouponEditModal";
import axiosInstance from "../../utils/axiosConfig";
import Swal from "sweetalert2";

const CouponSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [editCoupon, setEditCoupon] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [coupon, setCoupon] = useState([]);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleEditModal = (data: string) => {
    // console.log(id);
    // setEditCoupon(!editCoupon);
    setEditCoupon(data);
    setShowEditModal(!showEditModal);
  };
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/coupons");
      setCoupon(response?.data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (deletingId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.get(
          `/coupon/delete/${deletingId}`
        );
        if (response?.data?.success === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            customClass: {
              popup: "custom-swal-modal",
            },
          });
          getData();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was a problem deleting your file.",
          icon: "error",
          customClass: {
            popup: "custom-swal-modal",
          },
        });
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AddNewCoupon modal={modal} handleModal={handleModal} getData={getData} />
      <CouponEditModal
        modal={showEditModal}
        handleModal={handleEditModal}
        getData={getData}
        editCoupon={editCoupon}
      />
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
                <th className="py-2 px-6 text-start text-nowrap">Coupon Name</th>
                <th className="py-2 px-6 text-start text-nowrap">Coupon Code</th>
                <th className="py-2 px-6 text-start text-nowrap">Coupon Validity</th>
                <th className="py-2 px-6 text-start text-nowrap">Coupon Percentage</th>
                <th className="py-2 px-6 text-start text-nowrap">Status</th>
                <th className="py-2 px-6 text-start text-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {coupon.map((coup: any) => (
                <tr key={coup?.id}>
                  <TData className="px-6">{coup?.coupon_name}</TData>
                  <TData className="px-6">{coup?.coupon_code}</TData>
                  <TData className="px-6">
                    <span className="text-primary font-medium">
                      {coup?.validity}
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
    </>
  );
};

export default CouponSettings;
