import { RxCross1 } from "react-icons/rx";
import Form from "../../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoaingAnimation from "../../Loading/LoaingAnimation";
import LoadingButton from "../../Loading/LoadingButton";
import InputField from "../../Forms/InputField";
import { usePostAction } from "../../../utils/PostAction/PostAction";

export const validationSchema = z.object({
  package_name: z.string().min(1, "select any network"),
  package_price: z.string().min(1, "select any network"),
  duration: z.string().min(1, "select any network"),
  no_of_domains: z.string().min(1, "select any network"),
  short_description: z.string().min(1, "select any network"),
  description: z.string().min(1, "select any network"),
  savings: z.string().min(1, "select any network"),
});

export type IProps = {
  modal: boolean;
  handleModal: () => void;
  refetch: () => void;
};

const AddNewPlanModal = ({ handleModal, modal, refetch }: IProps) => {
  const { mutate, isPending } = usePostAction(
    "package/store",
    refetch,
    handleModal
  );
  const formSubmit: SubmitHandler<FieldValues> = (postData) => {
    mutate(postData);
  };
  return (
    <div className="w-full">
      <div
        className={` ${
          modal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto"
            : "opacity-0 -z-50"
        }`}
        onClick={handleModal}
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
            <h4>Add New Plan</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                package_name: "",
                package_price: "",
                duration: "",
                no_of_domains: "",
                short_description: "",
                description: "",
                savings: "",
              }}
            >
              <div className="md:w-11/12 w-full mx-auto">
                {/* Form Fields */}
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Package Name
                  </p>
                  <InputField
                    name="package_name"
                    type="text"
                    className="px-4"
                    placeholder="Enter Your Package Name"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Package Price
                  </p>
                  <InputField
                    name="package_price"
                    type="number"
                    className="px-4"
                    placeholder="Enter Your Package Price"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Package Duration
                  </p>
                  <InputField
                    name="duration"
                    type="number"
                    className="px-4"
                    placeholder="Enter Your Package Duration"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    No of domains
                  </p>
                  <InputField
                    name="no_of_domains"
                    type="number"
                    className="px-4"
                    placeholder="10%"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Short Description
                  </p>
                  <InputField
                    name="short_description"
                    type="text"
                    className="px-4"
                    placeholder="Enter Your Short Description"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Description
                  </p>
                  <InputField
                    name="description"
                    type="text"
                    className="px-4"
                    placeholder="Enter Your Description"
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">Savings</p>
                  <InputField
                    name="savings"
                    type="number"
                    className="px-4"
                    placeholder="Your savings"
                  />
                </div>
                <div className="w-full mt-6 border border-slate-300 rounded-lg">
                  {isPending ? (
                    <LoaingAnimation size={30} color="#36d7b7" />
                  ) : (
                    <LoadingButton className="w-full">Submit</LoadingButton>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPlanModal;
