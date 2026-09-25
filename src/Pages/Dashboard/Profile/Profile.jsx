import React, { useEffect, useState } from 'react';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaEdit,
    FaCalendarAlt,
} from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import { NavLink } from 'react-router';

const Profile = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    
            useEffect(() => {
            if (user?.email) {
                fetch(`http://localhost:3000/users?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setUserData(data));
            }
            }, [user]);

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#03373D]">
                    My Profile
                </h2>

                <p className="mt-2 text-[15px] text-gray-500">
                    Manage and view your account information.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Profile Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center text-center">

                        {/* Avatar */}
                        <div className="relative">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user?.displayName || 'Profile'}
                                    className="h-28 w-28 rounded-full object-cover ring-4 ring-[#CAEB66]/30"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#03373D] text-white ring-4 ring-[#CAEB66]/30">
                                    <FaUser className="text-4xl" />
                                </div>
                            )}

                            <button
                                type="button"
                                className="
                                    absolute bottom-1 right-1
                                    flex h-9 w-9
                                    items-center justify-center
                                    rounded-full
                                    border-4 border-white
                                    bg-[#CAEB66]
                                    text-[#03373D]
                                    transition
                                    hover:scale-105
                                "
                                title="Edit Profile"
                            >
                                <FaEdit className="text-sm" />
                            </button>
                        </div>

                        {/* Name */}
                        <h3 className="mt-5 text-xl font-bold text-[#03373D]">
                            {user?.displayName || 'User'}
                        </h3>

                        {/* Email */}
                        <p className="mt-1 text-sm text-gray-500">
                            {user?.email || 'No email available'}
                        </p>

                        {/* Role */}
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#CAEB66]/20 px-4 py-2 text-xs font-semibold text-[#03373D]">
                            <FaShieldAlt />
                            User Account
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-5">
                        <div>
                            <h3 className="text-lg font-semibold text-[#03373D]">
                                Account Information
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                Your personal account details.
                            </p>
                        </div>

                        <NavLink
                            to='/dashboard/editProfile'
                            className="
                                flex items-center gap-2
                                rounded-xl
                                bg-[#03373D]
                                px-4 py-2.5
                                text-sm font-semibold
                                text-white
                                transition
                                hover:opacity-90
                            "
                        >
                            <FaEdit />
                            Edit Profile
                        </NavLink>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Name */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <div className="mb-2 flex items-center gap-2 text-gray-400">
                                <FaUser className="text-sm" />

                                <span className="text-xs font-medium uppercase tracking-wide">
                                    Full Name
                                </span>
                            </div>

                            <p className="font-semibold text-[#03373D]">
                                {user?.displayName || 'Not provided'}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <div className="mb-2 flex items-center gap-2 text-gray-400">
                                <FaEnvelope className="text-sm" />

                                <span className="text-xs font-medium uppercase tracking-wide">
                                    Email Address
                                </span>
                            </div>

                            <p className="break-all font-semibold text-[#03373D]">
                                {user?.email || 'Not provided'}
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <div className="mb-2 flex items-center gap-2 text-gray-400">
                                <FaPhone className="text-sm" />

                                <span className="text-xs font-medium uppercase tracking-wide">
                                    Phone Number
                                </span>
                            </div>

                            <p className="font-semibold text-[#03373D]">
                                {user?.phone || 'Not provided'}
                            </p>
                        </div>

                        {/* Address */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <div className="mb-2 flex items-center gap-2 text-gray-400">
                                <FaMapMarkerAlt className="text-sm" />

                                <span className="text-xs font-medium uppercase tracking-wide">
                                    Address
                                </span>
                            </div>

                            <p className="font-semibold text-[#03373D]">
                                 {user?.address || 'Not provided'}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Account Status */}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03373D]/10 text-[#03373D]">
                        <FaShieldAlt />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#03373D]">
                            Account Status
                        </h3>

                        <p className="text-sm text-gray-400">
                            Current status of your Zap-Shift account.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Status
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                            <span className="text-sm font-semibold text-green-600">
                                Active
                            </span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Account Type
                        </p>

                        <p className="mt-2 text-sm font-semibold text-[#03373D]">
                            Regular User
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Authentication
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />

                            <span className="text-sm font-semibold text-[#03373D]">
                                Firebase
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;