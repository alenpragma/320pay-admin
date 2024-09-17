import { RxCross1 } from "react-icons/rx";
import { SubmitHandler, useForm } from "react-hook-form";

import LoadingButton from "../../Loading/LoadingButton";
import LoadingAnimation from "../../Loading/LoaingAnimation";
import { ErrorMessage } from "@hookform/error-message";
import { usePostAction } from "../../../utils/PostAction/PostAction";

export type IProps = {
  modal: boolean;
  handleModal: () => void;
  refetch: any;
};

// Define a more specific interface for form data
interface FormData {
  rpc_chain: string;
  chain_symbol: string;
  chain_id: number;
  image?: FileList;
}

const AddNewChainModal = ({ handleModal, modal, refetch }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { mutate, isPending } = usePostAction(
    "rpc-url/store",
    refetch,
    handleModal
  );
  const onSubmit: SubmitHandler<FormData> = async (chainData) => {
    console.log(chainData);
    mutate(chainData);
  };

  return (
    <div className="w-full">
      <div
        className={`${
          modal
            ? "opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto"
            : "opacity-0 -z-50"
        }`}
        onClick={handleModal}
      ></div>
      <div
        className={`fixed md:w-2/5 w-full h-fit m-auto right-0 left-0 top-0 rounded px-3 ${
          modal
            ? "bottom-10 opacity-100 duration-300 z-[101]"
            : "bottom-0 opacity-0 duration-300 pointer-events-none"
        }`}
      >
        <div className="w-full h-full rounded bg-[#ffffff]">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Add New Chain</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="md:w-11/12 w-full mx-auto">
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Chain Name
                  </p>
                  <input
                    className="px-4 w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1"
                    type="text"
                    {...register("rpc_chain", {
                      required: "This field is required.",
                    })}
                    placeholder="Enter Chain Name"
                  />
                  <div className="text-red-500 text-[12px]">
                    <ErrorMessage errors={errors} name="rpc_chain" />
                  </div>
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Chain Symbol
                  </p>
                  <input
                    className="px-4 w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1"
                    type="text"
                    {...register("chain_symbol", {
                      required: "This field is required.",
                    })}
                    placeholder="Enter Chain Symbol"
                  />
                  <div className="text-red-500 text-[12px]">
                    <ErrorMessage errors={errors} name="chain_symbol" />
                  </div>
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">Chain ID</p>
                  <input
                    className="px-4 w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1"
                    type="number"
                    {...register("chain_id", {
                      required: "This field is required.",
                    })}
                    placeholder="Enter Chain ID"
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <div className="text-red-500 text-[12px]">
                    <ErrorMessage errors={errors} name="chain_id" />
                  </div>
                </div>
                {/* <div className="relative mb-4 w-1/2">
                  <p className="font-semibold text-secondary mb-1">
                    Chain Logo
                  </p>
                  <input
                    className="px-4 w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md py-1"
                    type="file"
                    {...register("image")}
                    placeholder="Upload logo"
                  />
                </div> */}
                <div className="w-full mt-6 border border-slate-300 rounded-lg">
                  {isPending ? (
                    <LoadingAnimation size={30} color="#36d7b7" />
                  ) : (
                    <LoadingButton className="w-full">Submit</LoadingButton>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewChainModal;

// const onSubmit: SubmitHandler<FormData> = async (chainData) => {
//   setLoading(true);
//   try {
//     const formData = new FormData();
//     formData.append("rpc_chain", chainData.rpc_chain);
//     formData.append("chain_symbol", chainData.chain_symbol);
//     formData.append("chain_id", chainData.chain_id.toString());
//     if (chainData.image.length > 0) {
//       formData.append("image", chainData.image[0]);
//     }
//     const response = await axiosInstance.post("/rpc-url/store", formData);
//     if (response?.status === 200) {
//       Swal.fire({
//         title: "rpc added successfully",
//         icon: "success",
//         customClass: {
//           popup: "custom-swal-modal",
//         },
//       });
//       handleModal();
//       getData();
//       reset();
//     }
//   } catch (error) {
//     Swal.fire({
//       title: "Error",
//       text: "Failed to add coupon",
//       icon: "error",
//       customClass: {
//         popup: "custom-swal-modal",
//       },
//     });
//   } finally {
//     setLoading(false);
//   }
// };
