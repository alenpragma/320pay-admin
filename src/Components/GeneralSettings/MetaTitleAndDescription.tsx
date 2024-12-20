import React, { useState } from "react";
import Form from "../Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import InputField from "../Forms/InputField";
import { LuUploadCloud } from "react-icons/lu";
import Swal from "sweetalert2";
import { usePostAction } from "../../utils/PostAction/PostAction";
import { useSettingsData } from "../../hooks/FetchGlobalData/FetchGlobalData";

export const validationSchema = z.object({
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_banner: z.string().optional(),
});

const MetaTitleAndDescription = ({ userInformation, refetch }: any) => {
  const [bannerPreview, setBannerPreview] = useState<string | undefined>(
    undefined
  );
  const [image, setImage] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | null>("");
  const handleImageChange =
    (setPreview: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };

  const { data, isLoading } = useSettingsData();
  const metaTitle = data?.meta_title;
  const metaDescription = data?.meta_description;
  const { mutate, isPending } = usePostAction("/description/update", refetch);
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
      const formData = new FormData();
      if (image) {
        formData.append("meta_banner", image);
      }
      formData.append("meta_title", data.meta_title);
      formData.append("meta_description", data.meta_description);
      mutate(formData);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="mt-10 px-3  bg-[#FAFAFA] md:p-4 p-2 rounded-lg">
          <Form
            onSubmit={formSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              meta_title: metaTitle || "",
              meta_description: metaDescription || "",
              meta_banner: "",
            }}
          >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <div>
                <p className="text-slate-600 mb-2">Meta Title</p>
                <InputField
                  name="meta_title"
                  type="text"
                  className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
                />
              </div>
              <div>
                <p className="text-slate-600 mb-2">Meta Description</p>
                <InputField
                  name="meta_description"
                  type="text"
                  className="w-full border border-[#999999] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
                />
              </div>

              <div>
                <p className="text-slate-600 mb-2">Meta Banner</p>
                <label className="w-1/2 h-[100px] border-2 rounded-xl border-slate-300 p-1 relative flex justify-center items-center cursor-pointer">
                  <InputField
                    name="meta_banner"
                    type="file"
                    className="px-4 hidden"
                    onChange={handleImageChange(setBannerPreview)}
                  />
                  <div className="cursor-pointer w-full h-full flex justify-center items-center">
                    <img
                      className="w-full h-full object-contain"
                      src={bannerPreview || userInformation?.meta_banner}
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
            {error ? (
              <p className="text-red-500 text-[12px] mt-5">Warning : {error}</p>
            ) : (
              ""
            )}
          </Form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MetaTitleAndDescription;
