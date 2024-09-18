import { images } from "../..";
import { LuUploadCloud } from "react-icons/lu";
import InputField from "../Forms/InputField";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const validationSchema = z.object({
  logo: z.string().min(1, "This field is required."),
  favicon: z.string().min(1, "This field is required."),
});

const LogoAndFavicon = () => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div className="mt-10 px-3  bg-[#FAFAFA] md:p-4 p-2 rounded-lg">
      <h4 className="text-[18px] font-medium">Logo and Favicon</h4>
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          logo: "",
          favicon: "",
        }}
      >
        <div className="w-full gap-3 mt-8 md:h-[200px] h-fit flex justify-start md:flex-row flex-col">
          <div className="md:w-5/12 w-full">
            <p className="mb-1">Logo</p>
            <label className="md:w-full w-1/2 h-[170px] border-2 rounded-xl border-slate-300 p-1 md:relative flex justify-center items-center cursor-pointer">
              <InputField name="logo" type="file" className="hidden" />
              <div className="cursor-pointer w-full h-full flex justify-center items-center ">
                <img
                  className="w-full h-full object-contain"
                  src={images.logo}
                  alt="Logo"
                />
                <div className="md:absolute -right-3 -bottom-3 size-6 p-1 bg-white">
                  <LuUploadCloud className="size-full" />
                </div>
              </div>
            </label>
          </div>
          <div className="md:w-2/12 w-full">
            <p className="mb-1">Favicon</p>
            <label className="md:w-full w-1/2 h-[170px] border-2 rounded-xl border-slate-300 p-1 md:relative flex justify-center items-center cursor-pointer">
              <InputField name="favicon" type="file" className="hidden" />
              <div className="cursor-pointer w-full h-full flex justify-center items-center">
                <img
                  className="w-full h-full object-contain"
                  src={images.favicon}
                  alt="Logo"
                />
                <div className="md:absolute -right-3 -bottom-3 size-6 p-1 bg-white">
                  <LuUploadCloud className="size-full" />
                </div>
              </div>
            </label>
          </div>
          <div className="md:w-2/12 w-full flex flex-col justify-end  h-full">
            <button className="bg-primary font-medium rounded-xl text-white px-7 py-3 ">
              Update
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LogoAndFavicon;
