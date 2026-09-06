import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FiBell,
  FiChevronDown,
  FiMenu,
  FiUser,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Sidebar from "../components/Logo/Dashboard/Sidebar";

const DashboardLayout = () => {
  const {user, signOutUser} = useAuth();
  const navigate = useNavigate();

  const logOut = () =>{
    signOutUser()
    .then(()=>{
      navigate('/');
    })
    .catch()
  }

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content bg-[#f1f2f3] min-h-screen">

        {/* ================= NAVBAR ================= */}
        <header className="h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-5 lg:px-6">

          {/* Left Side */}
          <div className="flex items-center">
            <label
              htmlFor="dashboard-drawer"
              className="cursor-pointer w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FiMenu className="text-[21px] text-[#333]" />
            </label>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Notification */}
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
              <FiBell className="text-[17px] text-[#333]" />
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2.5 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#d9d9d9] overflow-hidden">
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-[14px] font-semibold text-[#222]">
                    {user?.displayName}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Admin
                  </p>
                </div>

                <FiChevronDown className="text-[16px] text-[#333] ml-1" />
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-xl z-[50] w-52 p-2 mt-3 shadow-lg border border-gray-100"
              >
                <li>
                  <a className="text-[14px] py-3">
                    <FiUser className="text-[17px]" />
                    Profile
                  </a>
                </li>

                <li>
                  <a className="text-[14px] py-3">
                    <FiSettings className="text-[17px]" />
                    Settings
                  </a>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <a onClick={logOut} className="text-[14px] py-3 text-red-500">
                    <FiLogOut className="text-[17px]" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="min-h-[calc(100vh-64px)]">
          <div className="min-h-screen bg-[#f1f2f3] p-4 md:p-6">
              <div className="bg-white rounded-xl p-5 md:p-6">
                  <Outlet />
               </div>
             </div>
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-40">

        {/* Overlay */}
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="w-[250px] min-h-full bg-white border-r border-gray-200">

          {/* ================= LOGO ================= */}
          <div className="h-[64px] flex items-center px-5 border-b border-gray-100">

            <NavLink to='/' target="_blank" className="flex items-center gap-1.5">

              {/* Logo Shape */}
              <div className="relative w-[23px] h-[30px]">
                <div className="absolute top-0 left-0 w-[23px] h-[10px] bg-[#CAEB66] -skew-y-[30deg]"></div>

                <div className="absolute top-[9px] left-0 w-[9px] h-[21px] bg-[#CAEB66]"></div>
              </div>

              <span className="text-[21px] font-bold text-[#222] tracking-tight">
                ZapShift
              </span>
            </NavLink>
          </div>

          {/* ================= SIDEBAR MENU ================= */}
          <Sidebar></Sidebar>

        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;