import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Forms/InputField";
import { z } from "zod";
import { usePostAction } from "../../utils/PostAction/PostAction";
import Swal from "sweetalert2";

export const validationSchema = z.object({
  admin_address: z.string().optional(),
  withdrawal_charge: z.string().optional(),
});

const PaymentSettings = ({ userInformation, refetch, isLoading }: any) => {
  const { mutate, isPending } = usePostAction("/payment/update", refetch);
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update data?",
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
      mutate(data);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>logings</p>
      ) : (
        <div className="mt-10 px-3  bg-[#FAFAFA] md:p-4 p-2 rounded-lg">
          <h4 className="text-[18px] font-medium mb-5">Payment Settings</h4>
          <Form
            onSubmit={formSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              admin_address: userInformation?.admin_address || "",
              withdrawal_charge: userInformation?.withdrawal_charge || "",
            }}
          >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div>
                <p className="text-slate-600 mb-2">Set Admin Wallet</p>
                <InputField
                  name="admin_address"
                  type="text"
                  className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
                  // placeholder="Admin Wallet"
                />
              </div>
              <div>
                <p className="text-slate-600 mb-2">Withdrwal Charge</p>
                <InputField
                  name="withdrawal_charge"
                  type="number"
                  className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
                  // placeholder="Withdrwal Charge"
                />
              </div>
              <div></div>
              <div className="flex justify-end items-end">
                <button className="bg-primary font-medium rounded-xl text-white px-7 py-3 ">
                  Update
                </button>
              </div>
            </div>
            {/* {error ? (
          <p className="text-red-500 text-[12px]">Warning : {error}</p>
        ) : (
          ""
        )} */}
          </Form>
        </div>
      )}
    </>
  );
};

export default PaymentSettings;
