import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import AddNewCoupon from "../../Components/Modal/CouponModal/AddNewCoupon";
import CouponEditModal from "../../Components/Modal/CouponModal/CouponEditModal";
import axiosInstance from "../../utils/axiosConfig";

const CouponSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [editCoupon, setEditCoupon] = useState<boolean>(false);
  const [coupon, setCoupon] = useState([]);
  console.log(coupon);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleEditModal = () => {
    setEditCoupon(!editCoupon);
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AddNewCoupon modal={modal} handleModal={handleModal} getData={getData}/>
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
                <th className="py-2 px-6 text-start">Coupon Name</th>
                <th className="py-2 px-6 text-start">Coupon Code</th>
                <th className="py-2 px-6 text-start">Coupon Validity</th>
                <th className="py-2 px-6 text-start">Coupon Percentage</th>
                <th className="py-2 px-6 text-start">Status</th>
                <th className="py-2 px-6 text-start">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {coupon.map((coup: any) => (
                <tr>
                  <TData className="px-6">{coup?.coupon_name}</TData>
                  <TData className="px-6">{coup?.coupon_code}</TData>
                  <TData className="px-6">
                    <span className="text-primary font-medium">
                      {coup?.validity}
                    </span>
                  </TData>
                  <TData className="px-6">{coup?.percentage}%</TData>
                  <TData className="px-6">
                    {coup?.visible_status === "1" ? (
                      <div className="bg-red-200 px-3 py-1 rounded-lg w-fit text-red-500">
                        <span>Deactive</span>
                      </div>
                    ) : (
                      <div className="bg-green-200 px-3 py-1 rounded-lg w-fit text-green-500">
                        <span>Active</span>
                      </div>
                    )}
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
