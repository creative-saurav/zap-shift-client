import React from 'react';
import { FaBoxOpen, FaClipboardCheck, FaHistory, FaMotorcycle, FaUsers } from 'react-icons/fa';
import { FiFileText, FiGrid, FiHelpCircle, FiHome, FiLayout, FiLock, FiMapPin, FiSettings, FiTag, FiTruck } from 'react-icons/fi';
import { MdAssignment, MdChangeHistory, MdOutlineBikeScooter, MdOutlinePedalBike } from 'react-icons/md';
import { NavLink } from 'react-router';
import useRole from '../../../Hooks/useRole';


const Sidebar = () => {
    const {role} = useRole();
    // console.log('user Role', role);
    return (
        <div className="px-4 pt-5">

            {/* MENU TITLE */}
            <p className="text-[12px] font-semibold text-[#222] uppercase mb-3">
              Menu
            </p>

            {/* Dashboard */}
             <NavLink to='/dashboard'   end className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }` }>
              <FiGrid className="text-[17px]" />

              <span className="text-[16px] font-semibold">
                Dashboard
              </span>
            </NavLink>

            {/* My Parcels */}
            <NavLink to='/dashboard/my-parcels' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }` }>
              <FaBoxOpen className="text-[17px]" />

              <span className="text-[16px]">
                My Parcels
              </span>
            </NavLink>
            {/*  Payment History */}
            <NavLink to='/dashboard/payment-history' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }` }>
              <FaHistory  className="text-[17px]" />
              <span className="text-[16px]">
                Payment History
              </span>
            </NavLink>

            {/* Riders Only Links */}
            {
                role === 'rider' && 
                <>
                <NavLink to='/dashboard/assign-deliveries' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }` }>
              <MdAssignment  className="text-[17px]" />
              <span className="text-[16px]">
                Assign Deliveries
              </span>
            </NavLink>
              <NavLink to='/dashboard/complete-deliveries' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }` }>
             <FaClipboardCheck className="text-[17px]" />
              <span className="text-[16px]">
                Completed Deliveries
              </span>
            </NavLink>
                </>
            }
            {/* Riders Only Links */}

            
            {/* Admin Only Links */}
            {
                role === 'admin' && 
                 <>
                 {/*  Riders Application */}
                    <NavLink to='/dashboard/approve-riders' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                    isActive
                        ? "bg-primary text-black"
                        : "hover:bg-primary hover:text-black"
                    }` }>
                    <FaMotorcycle className="text-[17px]" />

                    <span className="text-[16px]">
                        Approve Riders
                    </span>
                    </NavLink>
                 {/* Assign Riders  */}
                    <NavLink to='/dashboard/assign-riders' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                    isActive
                        ? "bg-primary text-black"
                        : "hover:bg-primary hover:text-black"
                    }` }>
                    <MdOutlineBikeScooter className="text-[17px]"/>


                    <span className="text-[16px]">
                        Assign Riders
                    </span>
                    </NavLink>

                     {/* User Management */}
                    <NavLink to='/dashboard/users' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                    isActive
                        ? "bg-primary text-black"
                        : "hover:bg-primary hover:text-black"
                    }` }>
                    <FaUsers className="text-[17px]" />

                    <span className="text-[16px]">
                        User Management
                    </span>
                    </NavLink>

                </>
            }
            {/* Admin Only Links */}
            {/* Deliveries */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiTruck className="text-[17px]" />

              <span className="text-[16px]">
                Deliveries
              </span>
            </div>

            {/* Invoices */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiFileText className="text-[17px]" />

              <span className="text-[16px]">
                Invoices
              </span>
            </div>

            {/* Stores */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiHome className="text-[17px]" />

              <span className="text-[16px]">
                Stores
              </span>
            </div>

            {/* Pricing Plan */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiTag className="text-[17px]" />

              <span className="text-[16px]">
                Pricing Plan
              </span>
            </div>

            {/* Coverage Area */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiMapPin className="text-[17px]" />

              <span className="text-[16px]">
                Coverage Area
              </span>
            </div>

            {/* GENERAL */}
            <p className="text-[12px] font-semibold text-[#222] uppercase mt-6 mb-3">
              General
            </p>

            {/* Settings */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiSettings className="text-[17px]" />

              <span className="text-[16px]">
                Settings
              </span>
            </div>

            {/* Change Password */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiLock className="text-[17px]" />

              <span className="text-[16px]">
                Change Password
              </span>
            </div>

            {/* Help */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiHelpCircle className="text-[17px]" />

              <span className="text-[16px]">
                Help
              </span>
            </div>

            {/* Layout */}
            <div className="h-[42px] px-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <FiLayout className="text-[17px]" />

              <span className="text-[16px]">
                Layout
              </span>
            </div>

          </div>
    );
};

export default Sidebar;