import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaEye, FaTrash, FaUserShield } from 'react-icons/fa';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FiShieldOff } from 'react-icons/fi';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [searchText, setSearchText] = useState('');

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        },
         placeholderData: (previousData) => previousData
    });


    const handleDelete = (userId)=>{
        Swal.fire({ 
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Agree"
            }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/users/${userId}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Success!",
                                text: `User delete successfully.`,
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        toast.error('Users Delete Failed!');
                    });
            }
        });
        
    }





    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#03373D]">
                    All Users
                </h2>
                <p className="text-[16px] text-gray-500 mt-2">
                    Manage and view all registered users.
                </p>
            </div>
            {/* Search */}
                <div className="mb-6 flex justify-end">
                    <div className="relative w-full sm:w-[350px]">
                        
                        <input
                            value={searchText}
                            type="search"
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search user..."
                            className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 
                                    bg-white text-[16px] text-[#03373D] 
                                    outline-none transition-all duration-200
                                    focus:border-[#CAEB66] focus:ring-4 focus:ring-[#CAEB66]/20
                                    placeholder:text-gray-400 shadow-sm"
                        />

                        {/* Search Icon */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-3.5-3.5" />
                            </svg>
                        </div>

                        {/* Clear Button */}
                        {searchText && (
                            <button
                                type="button"
                                onClick={() => setSearchText('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                        w-7 h-7 rounded-full
                                        flex items-center justify-center
                                        text-gray-400 hover:text-[#03373D]
                                        hover:bg-gray-100 transition"
                            >
                              
                            </button>
                        )}
                    </div>
                </div>

            {/* User Count */}
            <div className="mb-5">
                <p className="text-[18px] font-semibold text-[#03373D]">
                    Total Users:
                    <span className="ml-2 text-gray-600">
                        {users.length}
                    </span>
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full">

                        {/* Table Head */}
                        <thead className="bg-[#f7faf5] border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-5 text-left text-[16px] font-bold text-[#03373D]">
                                    #
                                </th>

                                <th className="px-6 py-5 text-left text-[16px] font-bold text-[#03373D]">
                                    User
                                </th>

                                <th className="px-6 py-5 text-left text-[16px] font-bold text-[#03373D]">
                                    Email
                                </th>

                                <th className="px-6 py-5 text-left text-[16px] font-bold text-[#03373D]">
                                    Role
                                </th>

                                <th className="px-6 py-5 text-left text-[16px] font-bold text-[#03373D]">
                                    Joined
                                </th>

                                <th className="px-6 py-5 text-center text-[16px] font-bold text-[#03373D]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                                >

                                    {/* Serial */}
                                    <td className="px-6 py-5 text-[16px] font-medium text-gray-600">
                                        {index + 1}
                                    </td>

                                    {/* User */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">

                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                            />

                                            <div>
                                                <h4 className="text-[17px] font-semibold text-[#03373D]">
                                                    {user.displayName}
                                                </h4>
                                            </div>

                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-5">
                                        <p className="text-[16px] text-gray-600">
                                            {user.email}
                                        </p>
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex px-4 py-1.5 rounded-full text-[14px] font-semibold capitalize
                                                ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : user.role === 'rider'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                }
                                            `}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Joined */}
                                    <td className="px-6 py-5">
                                        <p className="text-[16px] text-gray-600">
                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-3">

                                            <NavLink to={`/dashboard/edit-users/${user._id}`}
                                                className="w-10 h-10 rounded-lg bg-[#e8f3f5] hover:bg-[#CAEB66] text-[#03373D] flex items-center justify-center transition"
                                                title="Edit User"
                                            >
                                                <FaEdit />

                                            </NavLink>

                                            <button onClick={()=> handleDelete(user._id)}
                                                className="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition"
                                                title="Delete User"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-[18px] font-medium text-gray-500">
                            No users found.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Users;