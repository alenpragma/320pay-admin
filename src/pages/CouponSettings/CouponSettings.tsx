import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import AddNewCoupon from "../../Components/Modal/CouponModal/AddNewCoupon";
import CouponEditModal from "../../Components/Modal/CouponModal/CouponEditModal";

const CouponSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [editCoupon, setEditCoupon] = useState<boolean>(true);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleEditModal = () => {
    setEditCoupon(!editCoupon);
  };
  return (
    <>
      <AddNewCoupon modal={modal} handleModal={handleModal} />
      <CouponEditModal modal={editCoupon} handleModal={handleEditModal} />
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
                <th className="py-2 px-6 text-start">Coupon Code</th>
                <th className="py-2 px-6 text-start">Coupon Validity</th>
                <th className="py-2 px-6 text-start">Coupon Percentage</th>
                <th className="py-2 px-6 text-start">Number of Usage</th>
                <th className="py-2 px-6 text-start">Status</th>
                <th className="py-2 px-6 text-start">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <TData className="px-6">#45363463</TData>
              <TData className="px-6">
                <span className="text-primary font-medium">12/11/2024</span>
              </TData>
              <TData className="px-6">5%</TData>
              <TData className="px-6">
                {" "}
                <span className="text-primary font-medium">5</span>
              </TData>
              <TData className="px-6">
                <div className="bg-green-200 px-3 py-1 rounded-lg w-fit text-green-500">
                  <span>Active</span>
                </div>
              </TData>
              <TData className="px-6">
                <div className="flex items-center gap-3">
                  <FiEdit
                    onClick={handleEditModal}
                    className="size-5 text-primary cursor-pointer"
                  />{" "}
                  <RiDeleteBin6Line className="size-5 text-red-500 cursor-pointer" />
                </div>
              </TData>
            </tbody>
          </table>
        </TableBody>
      </div>
    </>
  );
};

export default CouponSettings;
