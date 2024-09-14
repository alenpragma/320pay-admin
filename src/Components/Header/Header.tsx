import { NavLink, useLocation } from "react-router-dom";
import DropdownUser, { UserOne } from "./DropdownUser";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { images } from "../..";
// import DarkModeSwitcher from "./DarkModeSwitcher"

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { pathname } = useLocation();
  const [rotate, setRotate] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [clientProfile, setClientProfile] = useState<any>();

  const capital = (text: string) => {
    if (!text) {
      return "";
    }
    const cleanedText = text
      .replace(/[\/-]/g, " ") // Replace '/' and '-' with spaces
      .replace(/dashboard/gi, "") // Remove the word 'dashboard', case insensitive
      .replace(/settings/gi, ""); // Remove the word 'settings', case insensitive
    return cleanedText.trim(); // Trim any extra spaces
  };

  const title = capital(pathname);
  const handleModal = () => {
    setModal(!modal);
    setRotate(!rotate);
    setVisible(!visible);
  };

  const getData = async () => {
    const response = await axiosInstance.get("/client-profile");
    if (response?.data?.success == 200) {
      setClientProfile(response?.data?.profile);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setModal(false);
    setRotate(false);
    setVisible(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <div>
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-[9] block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          <NavLink to="/" className="md:hidden block">
            <img className="w-[100px] h-7" src={images.logo} alt="" />
          </NavLink>
        </div>
        {/* <!-- Hamburger Toggle BTN --> */}

        <h4 className="text-[20px] font-semibold text-secondary capitalize md:block hidden">
          {pathname === "/dashboard" ? "Dashboard" : title}
        </h4>
        <div className="flex lg:ms-auto items-center gap-3 2xsm:gap-5">
          <h4 className="font-semibold text-[16px]">{clientProfile?.name}</h4>
          <img
            onClick={handleModal}
            className="size-12 rounded-full cursor-pointer border border-primary hover:scale-105 duration-300"
            src={UserOne}
            alt="user"
            width={100}
            height={100}
          />
          <DropdownUser
            modal={modal}
            handleRotate={handleModal}
            visible={visible}
            clientProfile={clientProfile}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
