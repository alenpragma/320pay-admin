import { removePaymentaToken } from "../../hooks/handelAuthToken";
import { Link, useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { handleLogOut } from "../../Actions/LogoutActions";
// import { handleLogOut } from "../../Actions/LogoutActions";

export const UserOne =
  "https://media.licdn.com/dms/image/D4E03AQFrmDuWUxQoMg/profile-displayphoto-shrink_200_200/0/1715645354619?e=2147483647&v=beta&t=_WBVcQpyigwPLI-efv18uQQ3eV_hhzU5DcUlIHl77HA";

const DropdownUser = ({ modal, clientProfile }: any) => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    handleLogOut(navigate, removePaymentaToken);
  };

  return (
    <div
      className={`w-[250px] h-fit rounded-3xl absolute  bg-[#eee] z-[7] transition-all duration-300 ease-in-out ${
        modal
          ? "top-18 right-5 opacity-100 translate-y-0"
          : "top-18 right-5 opacity-0 translate-y-[-20px] pointer-events-none"
      }`}
    >
      <div className="bg-[#eee] w-full h-full relative shadow-lg rounded-3xl">
        <div className="w-full py-10 p-5 ">
          <img
            className="size-16 rounded-full"
            src={UserOne}
            alt="user"
            width={100}
            height={100}
          />
          <h4 className="font-semibold text-[20px]">{clientProfile?.name}</h4>
          <p className="text-[12px]">
            User Id : {clientProfile?.client_secret_id}
          </p>
          <div className="text-[14px] py-2 hover:border-b border-b-slate-600 duration-300 hover:text-primary ">
            <Link to="/dashboard/change-password">
              <p>Edit profile</p>
            </Link>
          </div>
          <div className="text-[14px] py-2  duration-300 hover:text-primary cursor-pointer">
            <p className="flex items-center gap-2" onClick={logOutHandler}>
              Logout <RxExit />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownUser;
