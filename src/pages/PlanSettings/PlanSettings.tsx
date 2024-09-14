import TData from "../../Components/Table/TData";
import TableBody from "../../Components/TableBody/TableBody";
import { GoEye } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import AddNewPlanModal from "../../Components/Modal/PlanModal/AddNewPlanModal";
import ViewPlanModal from "../../Components/Modal/PlanModal/ViewPlanModal";
import axiosInstance from "../../utils/axiosConfig";
import PlanEditModal from "../../Components/Modal/PlanModal/PlanEditModal";
import Swal from "sweetalert2";

const PlanSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [viewPlan, setViewPlan] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [planEditData, setPlanEditData] = useState("");
  const [viewPlanData, setViewPlanData] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [plans, setPlan] = useState([]);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleViewModal = (planData: string) => {
    setViewPlan(!viewPlan);
    setViewPlanData(planData);
  };
  const handleEditModal = (planData: string) => {
    setEditModal(!editModal);
    setPlanEditData(planData);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/packages");
      setPlan(response.data[0]);
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
          `/package/delete/${deletingId}`
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
      <AddNewPlanModal
        modal={modal}
        handleModal={handleModal}
        getData={getData}
      />
      <PlanEditModal
        modal={editModal}
        handleModal={handleEditModal}
        getData={getData}
        planEditData={planEditData}
      />
      <ViewPlanModal
        modal={viewPlan}
        handleModal={handleViewModal}
        viewPlanData={viewPlanData}
      />
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
                <th className="py-2 px-6 text-start">Short Description</th>
                <th className="py-2 px-6 text-start">Savings</th>
                <th className="py-2 px-6 text-start">No of domains</th>
                <th className="py-2 px-6 text-start">Package Price</th>
                <th className="py-2 px-6 text-start">Duration</th>
                <th className="py-2 px-6 text-start">Description</th>
                <th className="py-2 px-6 text-start">Status</th>
                <th className="py-2 px-6 text-start">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {plans?.map((plan: any) => (
                <tr key={plan?.id}>
                  <TData className="px-6">{plan?.package_name}</TData>
                  <TData className="px-6">{plan?.short_description}</TData>
                  <TData className="px-6">{plan?.savings}</TData>
                  <TData className="px-6">{plan?.no_of_domains}</TData>
                  <TData className="px-6">
                    <span className="text-primary font-medium">
                      ${plan?.package_price}
                    </span>
                  </TData>
                  <TData className="px-6">
                    {Math.floor(Number(plan?.duration))} Month
                  </TData>
                  <TData className="px-6">
                    {plan?.description.replace(/\n/g, ", ")}
                  </TData>
                  <TData className="px-6">
                    {plan?.status !== "1" ? (
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
                      <GoEye
                        onClick={() => handleViewModal(plan)}
                        className="size-5 text-cblack cursor-pointer"
                      />{" "}
                      <FiEdit
                        onClick={() => handleEditModal(plan)}
                        className="size-5 text-primary cursor-pointer"
                      />{" "}
                      <RiDeleteBin6Line
                        onClick={() => handleDelete(plan?.id)}
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

export default PlanSettings;
