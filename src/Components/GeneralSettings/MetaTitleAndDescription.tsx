import React from "react";
import Form from "../Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputField from "../Forms/InputField";
import { images } from "../..";
import { LuUploadCloud } from "react-icons/lu";

export const validationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  banner: z.string().optional(),
});

const MetaTitleAndDescription = () => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="mt-10 px-3  bg-[#FAFAFA] md:p-4 p-2 rounded-lg">
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          meta: "",
          description: "",
          banner: "",
        }}
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <div>
            <p className="text-slate-600 mb-2">Meta Title</p>
            <InputField
              name="title"
              type="text"
              className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
              placeholder="Meta Title"
            />
          </div>
          <div>
            <p className="text-slate-600 mb-2">Meta Description</p>
            <InputField
              name="description"
              type="text"
              className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
              placeholder="Meta Title"
            />
          </div>

          <div>
            <p className="text-slate-600 mb-2">Meta Banner</p>
            <label className="w-1/2 h-[100px] border-2 rounded-xl border-slate-300 p-1 relative flex justify-center items-center cursor-pointer">
              <InputField name="logo" type="file" className="hidden" />
              <div className="cursor-pointer w-full h-full flex justify-center items-center">
                <img
                  className="w-full h-full object-contain"
                  src={images.logo}
                  alt="Logo"
                />
                <div className="absolute -right-3 -bottom-3 size-6 p-1 bg-white">
                  <LuUploadCloud className="size-full" />
                </div>
              </div>
            </label>
          </div>
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

export default MetaTitleAndDescription;
