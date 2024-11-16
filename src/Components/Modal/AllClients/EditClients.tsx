import { RxCross1 } from "react-icons/rx";
import Form from "../../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "../../Loading/LoadingButton";
import InputField from "../../Forms/InputField";
import Swal from "sweetalert2";
import { usePostAction } from "../../../utils/PostAction/PostAction";

export const validationSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().min(1, "This field is required"),
});
export type IProps = {
  modal: boolean;
  handleModal: (id: string) => void;
  refetch: any;
  editClient?: any;
};
const EditClients = ({ handleModal, modal, refetch, editClient }: IProps) => {
  const { name, email, id } = editClient;
  const { mutate } = usePostAction(
    "/user/update",
    refetch,
    handleModal
  );

  const formSubmit: SubmitHandler<FieldValues> = async (chainEdit) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be update data?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });
    if (result.isConfirmed) {
      refetch();
      mutate({ ...chainEdit, user_id: editClient?.id });
    }
  };

  return (
    <div className="w-full">
      <div
        className={` ${
          modal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto "
            : "opacity-0 -z-50"
        }`}
        onClick={() => handleModal("")}
      ></div>
      <div
        className={`fixed  md:w-2/5 w-full h-fit m-auto right-0 left-0 top-0 rounded px-3 ${
          modal
            ? "bottom-10 opacity-100  duration-300 z-[101]"
            : "bottom-0 opacity-0 duration-300 pointer-events-none"
        }`}
      >
        <div className="w-full h-full rounded bg-[#ffffff] ">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Update Client</h4>
            <RxCross1
              onClick={() => handleModal("")}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            {editClient ? (
              <Form
                onSubmit={formSubmit}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  name: name,
                  email: email,
                }}
              >
                <div className="md:w-11/12 w-full mx-auto">
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">
                      Edit Name
                    </p>
                    <InputField
                      name="name"
                      type="text"
                      className="px-4"
                      placeholder="Edit Name"
                    />
                  </div>
                  <div className="relative mb-4">
                    <p className="font-semibold text-secondary mb-1">
                      Edit Email
                    </p>
                    <InputField
                      name="email"
                      type="email"
                      className="px-4"
                      placeholder="Edit Email"
                    />
                  </div>

                  <LoadingButton className="w-full">Update</LoadingButton>

                  {/* <div className="w-full mt-6 border border-slate-300 rounded-lg">
                    {isPending ? (
                      <LoaingAnimation size={30} color="#36d7b7" />
                    ) : (
                      <LoadingButton className="w-full">Update</LoadingButton>
                    )}
                  </div> */}
                </div>
              </Form>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClients;




// import { RxCross1 } from "react-icons/rx";
// import Form from "../../Forms/Form";
// import { FieldValues, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import LoadingButton from "../../Loading/LoadingButton";
// import InputField from "../../Forms/InputField";
// import Swal from "sweetalert2";
// import { usePostAction } from "../../../utils/PostAction/PostAction";

// export const validationSchema = z.object({
//   name: z.string().min(1, "This field is required"),
//   email: z.string().min(1, "This field is required"),
//   secret_key: z.string().min(1, "This field is required"),
//   client_wallet_address: z.string().min(1, "This field is required"),
// });
// export type IProps = {
//   modal: boolean;
//   handleModal: (id: string) => void;
//   refetch: any;
//   editClient?: any;
// };
// const EditClients = ({ handleModal, modal, refetch, editClient }: IProps) => {
//   const { name, email} = editClient;
//   const { mutate } = usePostAction(
//     "/user/update",
//     refetch,
//     handleModal
//   );

//   const formSubmit: SubmitHandler<FieldValues> = async (chainEdit) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be update data?",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Update",
//       cancelButtonText: "Cancel",
//       customClass: {
//         popup: "custom-swal-modal",
//       },
//     });
//     if (result.isConfirmed) {
//       refetch();
//       mutate({ ...chainEdit, user_id: editClient?.id });
//     }
//   };

//   return (
//     <div className="w-full">
//       <div
//         className={` ${
//           modal
//             ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto "
//             : "opacity-0 -z-50"
//         }`}
//         onClick={() => handleModal("")}
//       ></div>
//       <div
//         className={`fixed  md:w-2/5 w-full h-fit m-auto right-0 left-0 top-0 rounded px-3 ${
//           modal
//             ? "bottom-10 opacity-100  duration-300 z-[101]"
//             : "bottom-0 opacity-0 duration-300 pointer-events-none"
//         }`}
//       >
//         <div className="w-full h-full rounded bg-[#ffffff] ">
//           <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
//             <h4>Update Client</h4>
//             <RxCross1
//               onClick={() => handleModal("")}
//               className="cursor-pointer hover:scale-105"
//             />
//           </div>
//           <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
//             {editClient ? (
//               <Form
//                 onSubmit={formSubmit}
//                 resolver={zodResolver(validationSchema)}
//                 defaultValues={{
//                   name: name,
//                   email: email,
//                   secret_key : "akjdljfaskd",
//                   client_wallet_address : "akjdljfaskdasdfsf",
//                 }}
//               >
//                 <div className="md:w-11/12 w-full mx-auto">
//                   <div className="relative mb-4">
//                     <p className="font-semibold text-secondary mb-1">
//                       Edit Name
//                     </p>
//                     <InputField
//                       name="name"
//                       type="text"
//                       className="px-4"
//                       placeholder="Edit Name"
//                     />
//                   </div>
//                   <div className="relative mb-4">
//                     <p className="font-semibold text-secondary mb-1">
//                       Edit Email
//                     </p>
//                     <InputField
//                       name="email"
//                       type="email"
//                       className="px-4"
//                       placeholder="Edit Email"
//                     />
//                   </div>
//                   <div className="relative mb-4">
//                     <p className="font-semibold text-secondary mb-1">
//                       Private Key
//                     </p>
//                     <InputField
//                       name="secret_key"
//                       type="text"
//                       className="px-4"
//                       placeholder="Edit Email"
//                     />
//                   </div>
//                   <div className="relative mb-4">
//                     <p className="font-semibold text-secondary mb-1">
//                       Wallet Address
//                     </p>
//                     <InputField
//                       name="client_wallet_address"
//                       type="text"
//                       className="px-4"
//                       placeholder="Edit Email"
//                     />
//                   </div>

//                   <LoadingButton className="w-full">Update</LoadingButton>

//                   {/* <div className="w-full mt-6 border border-slate-300 rounded-lg">
//                     {isPending ? (
//                       <LoaingAnimation size={30} color="#36d7b7" />
//                     ) : (
//                       <LoadingButton className="w-full">Update</LoadingButton>
//                     )}
//                   </div> */}
//                 </div>
//               </Form>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditClients;
