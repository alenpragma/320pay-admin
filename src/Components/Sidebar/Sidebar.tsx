/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { images, mainNavItem, submenuItem, subNavItem } from "../..";
import { MenuInterface } from "../../types/menuType";
import { GoChevronDown } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import { removePaymentaToken } from "../../hooks/handelAuthToken";
import { handleLogOut } from "../../Actions/LogoutActions";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [submenu, setSubmenu] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const active = pathname === "/dashboard";

  const [mouseHover, setMouseHover] = useState<number | null>(null);
  const handleSubmenu = () => {
    setSubmenu(!submenu);
  };

  const navigate = useNavigate();
  const logOutHandler = () => {
    handleLogOut(navigate, removePaymentaToken);
  };

  // const trigger = useRef<any>(null);
  // const sidebar = useRef<any>(null);

  // const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  // );
  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }: MouseEvent) => {
  //     if (!sidebar.current || !trigger.current) return;
  //     if (
  //       !sidebarOpen ||
  //       sidebar.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }: KeyboardEvent) => {
  //     if (!sidebarOpen || keyCode !== 27) return;
  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  // useEffect(() => {
  //   localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
  //   if (sidebarExpanded) {
  //     document.querySelector("body")?.classList.add("sidebar-expanded");
  //   } else {
  //     document.querySelector("body")?.classList.remove("sidebar-expanded");
  //   }
  // }, [sidebarExpanded]);

  return (
    <aside
      // ref={sidebar}
      className={`absolute left-0 top-0 z-[5] flex h-screen w-64 flex-col overflow-y-hidden border-r-2 border-r-[#E2E2E9] bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2 lg:py-2.5 pt-8">
        <NavLink to="/dashboard" className=" w-full md:block hidden">
          <img className="w-full h-14" src={images.logo} alt="" />
        </NavLink>
        <button
          // ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar mt-5 flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-0 py-4 px-4 lg:mt-0 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/dashboard"
                onMouseEnter={() => setMouseHover(12)}
                onMouseLeave={() => setMouseHover(null)}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`${
                  active
                    ? "p-2 rounded-md font-semibold  text-primary  hover:bg-[#EFEBFE] duration-300 cursor-pointer flex items-center gap-3 bg-[#EFEBFE]"
                    : "p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3"
                }`}
              >
                <span>
                  {"dashboard" === pathname || mouseHover == 12 ? (
                    <img src={images.homeHover} alt="" />
                  ) : (
                    <img src={images.home} alt="" />
                  )}
                </span>
                <span>Dashboard</span>
              </NavLink>
              {mainNavItem.map((item: MenuInterface) => (
                <NavLink
                  key={item.item}
                  to={item.pathname}
                  onMouseEnter={() => setMouseHover(item.id)}
                  onMouseLeave={() => setMouseHover(null)}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 rounded-md font-semibold  text-primary  hover:bg-[#EFEBFE] duration-300 cursor-pointer flex items-center gap-3 bg-[#EFEBFE]"
                      : "p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3"
                  }
                >
                  <span>
                    {mouseHover == item.id || item.pathname === pathname ? (
                      <img src={item?.icon2} alt="" />
                    ) : (
                      <img src={item?.icon1} alt="" />
                    )}
                  </span>
                  <span> {item.item}</span>
                </NavLink>
              ))}
              <div>
                <div
                  onMouseEnter={() => setMouseHover(10)}
                  onMouseLeave={() => setMouseHover(null)}
                  className="p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3 justify-between"
                  onClick={handleSubmenu}
                >
                  <div className="flex items-center gap-3">
                    <span>
                      {mouseHover == 10 ? (
                        <img
                          className="size-6"
                          src={images.settingsHover}
                          alt=""
                        />
                      ) : (
                        <img className="size-6" src={images.settings} alt="" />
                      )}
                    </span>
                    <span> {"Setting"}</span>
                  </div>
                  <GoChevronDown className="size-6" />
                </div>
                <div className="pl-4">
                  {submenu ? (
                    <>
                      {submenuItem.map((item: MenuInterface) => (
                        <NavLink
                          key={item.id}
                          to={item.pathname}
                          onMouseEnter={() => setMouseHover(item.id)}
                          onMouseLeave={() => setMouseHover(null)}
                          onClick={() => setSidebarOpen(!sidebarOpen)}
                          className={({ isActive }) =>
                            isActive
                              ? "p-2 rounded-md font-semibold  text-primary  hover:bg-[#EFEBFE] duration-300 cursor-pointer flex items-center gap-3 bg-[#EFEBFE]"
                              : "p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3"
                          }
                        >
                          <span>
                            {mouseHover == item.id ||
                            item.pathname === pathname ? (
                              <img
                                className="size-6"
                                src={item?.icon2}
                                alt=""
                              />
                            ) : (
                              <img
                                className="size-6"
                                src={item?.icon1}
                                alt=""
                              />
                            )}
                          </span>
                          <span> {item.item}</span>
                        </NavLink>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </ul>
          </div>
          <div className="mt-5">
            <h4 className="font-semibold text-[14px] text-[#868B8F]">
              Post Purchase Step
            </h4>
            <ul className="mb-6 mt-6 flex flex-col space-y-2">
              {subNavItem.map((item: MenuInterface) => (
                <NavLink
                  key={item.pathname}
                  to={item.pathname}
                  onMouseEnter={() => setMouseHover(item.id)}
                  onMouseLeave={() => setMouseHover(null)}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 rounded-md font-semibold  text-primary  hover:bg-[#EFEBFE] duration-300 cursor-pointer flex items-center gap-3 bg-[#EFEBFE]"
                      : "p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3"
                  }
                >
                  <span>
                    {mouseHover == item.id || item.pathname === pathname ? (
                      <img className="size-6" src={item?.icon2} alt="" />
                    ) : (
                      <img className="size-6" src={item?.icon1} alt="" />
                    )}
                  </span>
                  <span> {item.item}</span>
                </NavLink>
              ))}
              <div
                className="p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3 justify-between"
                onClick={logOutHandler}
              >
                <div className="flex items-center gap-3">
                  <RxExit className="size-6 rotate-180" />
                  <span> {"Logout"}</span>
                </div>
              </div>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
