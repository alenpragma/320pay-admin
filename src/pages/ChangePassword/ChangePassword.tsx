import ChangeProfile from "./ChangeProfile";
import PasswordChange from "./PasswordChange";

const ChangePassword = () => {
  return (
    <div className="pt-5 px-3">
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-20">
        <div className="w-full h-full overflow-hidden border-b border-b-slate-200 rounded-b-lg shadow-5">
          <h4 className="text-[#282828] text-[20px] font-medium mb-5">
            Change Password
          </h4>
          <div className="border border-slate-200 shadow-6 py-6 px-3 rounded-lg h-full">
            <PasswordChange />
          </div>
        </div>
        <div className="w-full h-full overflow-hidden border-b border-b-slate-200 rounded-b-lg shadow-5">
          <h4 className="text-[#282828] text-[20px] font-medium mb-5">
            Edit Profile
          </h4>
          <div className="border border-slate-200 shadow-6 py-6 px-3 rounded-lg h-full relative">
            <ChangeProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
