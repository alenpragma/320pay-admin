import { images } from "../..";
import { LuUploadCloud } from "react-icons/lu";
import InputField from "../Forms/InputField";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { usePostAction } from "../../utils/PostAction/PostAction";
import Swal from "sweetalert2";
import LoadingAnimation from "../Loading/LoaingAnimation";

export const validationSchema = z.object({
  logo: z.string().optional(),
  fav_icon: z.string().optional(),
});

const LogoAndFavicon = () => {
  const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined);
  const [faviconPreview, setFaviconPreview] = useState<string | undefined>(
    undefined
  );

  const [error, setError] = useState<string | null>("");
  const handleImageChange =
    (setPreview: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
      }
    };

  const { mutate, isPending } = usePostAction("/logo/update");
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (logoPreview == undefined && faviconPreview == undefined) {
      setError("Please fill up the form input");
      return;
    }
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
      formData.append("logo", data.logo[0]);
      formData.append("fav_icon", data.fav_icon[0]);
      mutate(formData);
    }
  };

  return (
    <div className="mt-10 px-3 bg-[#FAFAFA] md:p-4 p-2 rounded-lg">
      <h4 className="text-[18px] font-medium">Logo and Favicon</h4>
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          logo: "",
          fav_icon: "",
        }}
      >
        <div className="w-full gap-3 mt-8 md:h-[200px] h-fit flex justify-start md:flex-row flex-col">
          {/* Logo Input */}
          <div className="md:w-5/12 w-full">
            <p className="mb-1">Logo</p>
            <label className="md:w-full w-1/2 h-[170px] border-2 rounded-xl border-slate-300 p-1 md:relative flex justify-center items-center cursor-pointer">
              <InputField
                name="logo"
                type="file"
                className="px-4 hidden"
                onChange={handleImageChange(setLogoPreview)}
              />
              <div className="cursor-pointer w-full h-full flex justify-center items-center">
                <img
                  className="w-full h-full object-contain"
                  src={logoPreview || images.logo}
                  alt="Logo"
                />
                <div className="md:absolute -right-3 -bottom-3 size-6 p-1 bg-white">
                  <LuUploadCloud className="size-full" />
                </div>
              </div>
            </label>
          </div>

          {/* Favicon Input */}
          <div className="md:w-2/12 w-full">
            <p className="mb-1">Favicon</p>
            <label className="md:w-full w-1/2 h-[170px] border-2 rounded-xl border-slate-300 p-1 md:relative flex justify-center items-center cursor-pointer">
              <InputField
                name="fav_icon"
                type="file"
                className="px-4 hidden"
                onChange={handleImageChange(setFaviconPreview)}
              />
              <div className="cursor-pointer w-full h-full flex justify-center items-center">
                <img
                  className="w-full h-full object-contain"
                  src={faviconPreview || images.favicon}
                  alt="Favicon"
                />
                <div className="md:absolute -right-3 -bottom-3 size-6 p-1 bg-white">
                  <LuUploadCloud className="size-full" />
                </div>
              </div>
            </label>
          </div>

          <div className="md:w-2/12 w-full flex flex-col justify-end h-full">
            <div className="w-full mt-6 border border-slate-300 rounded-lg">
              {isPending ? (
                <LoadingAnimation size={30} color="#36d7b7" />
              ) : (
                <button className="bg-primary font-medium rounded-xl text-white w-full py-3">
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
        {error ? (
          <p className="text-red-500 text-[12px] mt-5">Warning : {error}</p>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

export default LogoAndFavicon;
