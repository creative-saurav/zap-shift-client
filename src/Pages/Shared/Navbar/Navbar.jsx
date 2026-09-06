import React, { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {user, setUser, signOutUser} = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () =>{
    signOutUser()
    .then(()=>{
      navigate('/');
    }).catch()
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-[8px] rounded-[5px] text-base transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            `p-[8px] rounded-[5px] text-base transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }`
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `p-[8px] rounded-[5px] text-base transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/send-parcel"
          className={({ isActive }) =>
            `p-[8px] rounded-[5px] text-base transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }`
          }
        >
          Send A Parcel
        </NavLink>
      </li>

    </>
  );

  return (
    <nav className="mt-6 bg-white rounded-2xl shadow-sm px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8  text-gray-500 font-medium">
          {links}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">

          

          <NavLink to='/rider' className="flex items-center bg-primary  rounded-full pl-6 pr-1 py-1 hover:bg-secondary  hover:text-white transition">
            <span className="font-semibold text-base pr-3">Be a Rider</span>

            <span className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
              <FiArrowUpRight className="text-lime-300 text-lg" />
            </span>
          </NavLink>

         {
          user ? (
             <div className="dropdown dropdown-end">
            {/* Profile */}
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer"
            >
              <div className="w-10 rounded-full border-2 border-primary">
                <img
                  src={user.photoURL}
                  alt="Profile"
                />
              </div>
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[50] mt-3 w-48 p-2 shadow-lg border border-gray-100"
            >
              <li>
                <NavLink to={'/dashboard/my-parcels'}>MY Parcels</NavLink>
              </li>

              <li>
                <a>Settings</a>
              </li>

              <li>
                <a onClick={handleSignOut} className="text-red-500">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
          ) : (
            <Link to='/login' className="px-6 py-2.5 border border-gray-200 rounded-full font-semibold text-base hover:bg-gray-100 transition">
            Sign In
          </Link>
          )
         }

        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-3xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-5 border-t pt-5" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-5 text-gray-600 font-medium">
          {links}
        </ul>

        <div className="flex flex-col gap-3 mt-6">
          <button className="w-full py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition">
            Sign In
          </button>

          <button className="w-full py-3 rounded-full bg-primary hover:bg-secondary transition flex items-center justify-center gap-2 font-semibold">
            Be a Rider
            <FiArrowUpRight className="text-lg" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
