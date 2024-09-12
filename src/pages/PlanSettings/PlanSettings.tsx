import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { GoEye } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import AddNewPlanModal from "../../Components/Modal/PlanModal/AddNewPlanModal";
import ViewPlanModal from "../../Components/Modal/PlanModal/ViewPlanModal";

const PlanSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [viewPlan, setViewPlan] = useState<boolean>(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleViewModal = () => {
    setViewPlan(!viewPlan);
  };
  return (
    <>
      <AddNewPlanModal modal={modal} handleModal={handleModal} />
      <ViewPlanModal modal={viewPlan} handleModal={handleViewModal} />
      <div className="py-5 px-3">
        <div className="w-full flex justify-end">
          <button
            onClick={handleModal}
            className="px-4 py-1 bg-primary rounded-lg text-white font-medium"
          >
            Add New Plan
          </button>
        </div>
        <TableBody>
          <table className=" border-collapse w-full">
            <thead>
              <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
                <th className="py-2 px-6 text-start rounded-tl-lg ">
                  Package Name
                </th>
                <th className="py-2 px-6 text-start">Package Price</th>
                <th className="py-2 px-6 text-start">Package Duration</th>
                <th className="py-2 px-6 text-start">Savings</th>
                <th className="py-2 px-6 text-start">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <TData className="px-6">Starter</TData>
              <TData className="px-6">
                <span className="text-primary font-medium">$100</span>
              </TData>
              <TData className="px-6">1 Month</TData>
              <TData className="px-6">0%</TData>
              <TData className="px-6">
                <div className="flex items-center gap-3">
                  <GoEye
                    onClick={handleViewModal}
                    className="size-5 text-cblack cursor-pointer"
                  />{" "}
                  <FiEdit className="size-5 text-primary cursor-pointer" />{" "}
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

export default PlanSettings;
