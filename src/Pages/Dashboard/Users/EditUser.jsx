import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditUser = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: user = {} , isLoading} = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${id}`);
            return res.data;
        }
    });

    const {
        register,
        handleSubmit
        // formState: { errors },
        } = useForm();

        const updateUser = (data) =>{
            axiosSecure.patch(`/users/${id}`, data)
            .then(() => {
                // console.log('After User store', data );
                navigate('/dashboard/users');
                toast.success('User Update Successfully.');
            })
            .catch(()=>{
                toast.error('User Updated Failed.')
            })
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
                    Update User
                </h2>
                <p className="text-[16px] text-gray-500 mt-2">
                    Update user information
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">

                {/* Profile */}
                <div className="flex items-center gap-5 pb-7 mb-7 border-b border-gray-200">
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-20 h-20 rounded-full object-cover border border-gray-200"
                    />

                    <div>
                        <h3 className="text-2xl font-bold text-[#03373D]">
                            {user.displayName}
                        </h3>

                        <p className="text-[16px] text-gray-500 mt-1">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-6"  onSubmit={handleSubmit(updateUser)}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user.displayName}
                                 {...register("displayName")}
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]" readOnly
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                defaultValue={user.phone}
                                 {...register("phone")}
                                placeholder="Enter phone number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                defaultValue={user.dateOfBirth}
                                 {...register("dateOfBirth")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Select Role
                            </label>
                            <select
                                defaultValue={user.role || ''}
                                 {...register("role")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            >
                                <option value='' disabled>Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="rider">Rider</option>
                            </select>
                        </div>
                        {/* Gender */}
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Gender
                            </label>
                            <select
                                defaultValue={user.gender || ''}
                                 {...register("gender")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            >
                                <option value='' disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* District
                        <div>
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                District
                            </label>
                            <input
                                type="text"
                                defaultValue={user.district}
                                placeholder="Enter district"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            />
                        </div> */}

                        {/* Profile Photo */}
                        <div className="md:col-span-2">
                            <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                                Profile Photo URL
                            </label>
                            <input
                                type="text"
                                defaultValue={user.photoURL}
                                 {...register("photoURL")}
                                placeholder="Enter profile photo URL"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px]"
                            />
                        </div>

                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                            Address
                        </label>
                        <textarea
                            defaultValue={user.address}
                             {...register("address")}
                            rows="3"
                            placeholder="Enter your full address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px] resize-none"
                        ></textarea>
                    </div>

                    {/* About */}
                    <div>
                        <label className="block text-[16px] font-semibold text-[#03373D] mb-2">
                            About
                        </label>
                        <textarea
                            defaultValue={user.bio}
                             {...register("bio")}
                            rows="4"
                            placeholder="Write something about yourself..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#03373D] text-[16px] resize-none"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <div className="flex justify-start pt-2">
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-lg bg-[#CAEB66] hover:bg-[#bce05d] text-[#03373D] text-[16px] font-bold transition"
                        >
                            Update User
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditUser;