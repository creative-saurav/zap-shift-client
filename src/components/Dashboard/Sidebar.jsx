import React from 'react';
import { FaBoxes, FaBoxOpen, FaClipboardCheck, FaHistory, FaMotorcycle, FaStar, FaUser, FaUsers } from 'react-icons/fa';
import { FiFileText, FiGrid, FiMapPin, FiSettings } from 'react-icons/fi';
import { MdAssignment, MdOutlineBikeScooter } from 'react-icons/md';
import { NavLink } from 'react-router';
import useRole from '../../Hooks/useRole';



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
                 {/* My Parcels */}
                    <NavLink to='/dashboard/all-parcels' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                      isActive
                        ? "bg-primary text-black"
                        : "hover:bg-primary hover:text-black"
                    }` }>
                      <FaBoxes className="text-[17px]" />

                      <span className="text-[16px]">
                        All Parcels
                      </span>
                    </NavLink>
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
                    <NavLink to='/dashboard/user-reviews' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                    isActive
                        ? "bg-primary text-black"
                        : "hover:bg-primary hover:text-black"
                    }` }>
                    <FaStar className="text-[17px]" />

                    <span className="text-[16px]">
                         Reviews
                    </span>
                    </NavLink>

                     {/* Coverage Area */}
                    <NavLink to='/dashboard/coverage-area' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                    isActive
                        ? "bg-primary text-black"
                        : "hover:bg-primary hover:text-black"
                    }` }>
                      <FiMapPin className="text-[17px]" />

                      <span className="text-[16px]">
                        Coverage Area
                      </span>
                    </NavLink>

                </>
            }
            {/* Admin Only Links */}


      

           

            {/* GENERAL */}
            <p className="text-[12px] font-semibold text-[#222] uppercase mt-6 mb-3">
              General
            </p>

            <NavLink to='/dashboard/profile' className={({isActive})=> `h-[42px] px-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
              isActive
                ? "bg-primary text-black"
                : "hover:bg-primary hover:text-black"
            }` }>
              <FaUser className="text-[17px]" />

              <span className="text-[16px]">
                Profile
              </span>
            </NavLink>


          </div>
    );
};

export default Sidebar;