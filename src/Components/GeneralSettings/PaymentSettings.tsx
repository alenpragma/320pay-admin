import { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Forms/InputField";
import { z } from "zod";

export const validationSchema = z.object({
  admin_wallet: z.string().optional(),
  withdraw_charge: z.string().optional(),
});

const PaymentSettings = () => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div className="mt-10 px-3  bg-[#FAFAFA] md:p-4 p-2 rounded-lg">
      <h4 className="text-[18px] font-medium mb-5">Payment Settings</h4>
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          admin_wallet: "",
          withdraw_charge: "",
        }}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <div>
            <p className="text-slate-600 mb-2">Set Admin Wallet</p>
            <InputField
              name="admin_wallet"
              type="text"
              className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
              placeholder="Meta Title"
            />
          </div>
          <div>
            <p className="text-slate-600 mb-2">Withdraw Charge</p>
            <InputField
              name="withdraw_charge"
              type="text"
              className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
              placeholder="Meta Title"
            />
          </div>
          <div></div>
          <div className="flex justify-end items-end">
            <button className="bg-primary font-medium rounded-xl text-white px-7 py-3 ">
              Update
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PaymentSettings;
