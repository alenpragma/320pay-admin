import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import LoadingButton from "../../Components/Loading/LoadingButton";
import LoaingAnimation from "../../Components/Loading/LoaingAnimation";

const ChangeProfile = () => {
  const { register, handleSubmit } = useForm<FieldValues>();

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1 my-3">
        <p className="text-[#282828] flex items-center gap-2">
          <FaUser /> <span>Edit Name</span>
        </p>
        <div className="relative">
          <input
            {...register("edit_name", { required: true })}
            type="text"
            className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-400 rounded-md py-1 px-4"
            placeholder="Old Password"
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-[#282828] flex items-center gap-2">
          <FaUser /> <span>Edit Profile Image</span>
        </p>
        <input
          {...register("profile_image", { required: true })}
          type="file"
          className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-100 rounded-md py-1 px-4"
          placeholder="Type Your Name"
        />
      </div>
      <div className="w-[200px] mt-6 border border-slate-300 rounded-lg md:absolute bottom-[68px] left-3">
        {loading ? (
          <LoaingAnimation size={30} color="#36d7b7" />
        ) : (
          <LoadingButton className="w-full">Change Profile</LoadingButton>
        )}
      </div>
    </form>
  );
};

export default ChangeProfile;
