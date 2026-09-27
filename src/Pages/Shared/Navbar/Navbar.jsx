
import React, { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { FiMenu, FiX, FiArrowUpRight, FiUser, FiPackage, FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        setOpen(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink
          onClick={closeMobileMenu}
          to="/"
          className={({ isActive }) =>
            `zip-nav-link${isActive ? " is-active" : ""}`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={closeMobileMenu}
          to="/coverage"
          className={({ isActive }) =>
            `zip-nav-link${isActive ? " is-active" : ""}`
          }
        >
          Coverage
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={closeMobileMenu}
          to="/about-us"
          className={({ isActive }) =>
            `zip-nav-link${isActive ? " is-active" : ""}`
          }
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={closeMobileMenu}
          to="/send-parcel"
          className={({ isActive }) =>
            `zip-nav-link${isActive ? " is-active" : ""}`
          }
        >
          Send A Parcel
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="zip-site-nav">
      <div className="zip-header-row">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <ul className="zip-header-links hidden lg:flex items-center gap-8 text-gray-500 font-medium">
          {links}
        </ul>

        {/* Desktop Buttons */}
        <div className="zip-header-actions hidden lg:flex items-center gap-3">

          <NavLink
            to="/rider"
            className="zip-rider-link"
          >
            <span className="font-semibold text-base pr-3">
              Be a Rider
            </span>

            <span className="zip-rider-icon">
              <FiArrowUpRight />
            </span>
          </NavLink>

          {user ? (
            <div className="dropdown dropdown-end">
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

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[50] mt-3 w-48 p-2 shadow-lg border border-gray-100"
              >
                <li>
                  <NavLink to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/my-parcels">
                    My Parcels
                  </NavLink>
                </li>

                <li>
                  <a
                    onClick={handleSignOut}
                    className="text-red-500"
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
                className="zip-signin-link"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="zip-menu-button lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`zip-mobile-menu lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open
            ? "max-h-[700px] opacity-100 mt-5"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 pt-5">

          {/* Mobile User Profile */}
          {user && (
            <div className="flex items-center gap-3 p-3 mb-4 bg-gray-50 rounded-2xl">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {user.displayName || "User"}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          <ul className="zip-mobile-links">
            {links}
          </ul>

          {/* Logged in user links */}
          {user && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1">

              <NavLink
                onClick={closeMobileMenu}
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <FiUser className="text-lg" />
                Dashboard
              </NavLink>

              <NavLink
                onClick={closeMobileMenu}
                to="/dashboard/my-parcels"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                <FiPackage className="text-lg" />
                My Parcels
              </NavLink>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition text-left"
              >
                <FiLogOut className="text-lg" />
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile Action Buttons */}
          <div className="mt-5 grid grid-cols-1 gap-3">

            {!user && (
              <Link
                onClick={closeMobileMenu}
                to="/login"
                className="zip-mobile-signin"
              >
                Sign In
              </Link>
            )}

            <Link
              onClick={closeMobileMenu}
              to="/rider"
              className="zip-mobile-rider"
            >
              Be a Rider
              <span className="zip-rider-icon">
                <FiArrowUpRight />
              </span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
