
import React, { useState } from 'react';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCamera,
    FaSave,
    FaArrowLeft,
    FaLock,
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(
        user?.photoURL || ''
    );

    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        setLoading(true);

        const profileData = {
            displayName: form.name.value,
            phone: form.phone.value,
            address: form.address.value,
            photoURL: imagePreview || user?.photoURL || '',
        };

        axiosSecure
            .patch(`/profileUpdate?email=${user?.email}`, profileData)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Profile updated successfully!');

                    navigate('/dashboard/profile');
                } else {
                    toast.error('Profile updated failed!');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#03373D]">
                    Edit Profile
                </h2>

                <p className="mt-2 text-[15px] text-gray-500">
                    Update your personal information and profile details.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">

                    {/* Profile Photo */}
                    <div className="mb-8">
                        <div className="mb-5">
                            <h3 className="text-lg font-semibold text-[#03373D]">
                                Profile Photo
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                Update your profile picture.
                            </p>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="relative">

                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile"
                                        className="
                                            h-24 w-24
                                            rounded-full
                                            object-cover
                                            ring-4 ring-[#CAEB66]/30
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex h-24 w-24
                                            items-center justify-center
                                            rounded-full
                                            bg-[#03373D]
                                            text-white
                                            ring-4 ring-[#CAEB66]/30
                                        "
                                    >
                                        <FaUser className="text-3xl" />
                                    </div>
                                )}

                                <label
                                    htmlFor="profileImage"
                                    className="
                                        absolute bottom-0 right-0
                                        flex h-9 w-9
                                        cursor-pointer
                                        items-center justify-center
                                        rounded-full
                                        border-4 border-white
                                        bg-[#CAEB66]
                                        text-[#03373D]
                                        transition
                                        hover:scale-105
                                    "
                                >
                                    <FaCamera className="text-sm" />
                                </label>

                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#03373D]">
                                    {user?.displayName || 'Your Profile'}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    JPG, PNG or WEBP. Recommended size
                                    400x400px.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="border-t border-gray-100 pt-7">

                        <div className="mb-5 flex items-center gap-3">
                            <div
                                className="
                                    flex h-10 w-10
                                    items-center justify-center
                                    rounded-xl
                                    bg-[#03373D]/10
                                    text-[#03373D]
                                "
                            >
                                <FaUser />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#03373D]">
                                    Personal Information
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Update your basic account information.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label
                                    className="
                                        mb-2 block
                                        text-sm font-medium
                                        text-[#03373D]
                                    "
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <FaUser
                                        className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input
                                        name="name"
                                        type="text"
                                        defaultValue={
                                            user?.displayName || ''
                                        }
                                        placeholder="Enter your full name"
                                        required
                                        className="
                                            h-12 w-full rounded-xl
                                            border border-gray-200
                                            bg-white pl-11 pr-4
                                            text-sm text-[#03373D]
                                            outline-none
                                            transition
                                            placeholder:text-gray-400
                                            focus:border-[#CAEB66]
                                            focus:ring-4 focus:ring-[#CAEB66]/20
                                        "
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    className="
                                        mb-2 block
                                        text-sm font-medium
                                        text-[#03373D]
                                    "
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <FaEnvelope
                                        className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input
                                        name="email"
                                        type="email"
                                        value={user?.email || ''}
                                        readOnly
                                        className="
                                            h-12 w-full rounded-xl
                                            border border-gray-200
                                            bg-gray-50 pl-11 pr-4
                                            text-sm text-gray-500
                                            outline-none
                                            cursor-not-allowed
                                        "
                                    />
                                </div>

                                <p className="mt-1.5 text-xs text-gray-400">
                                    Email address cannot be changed.
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    className="
                                        mb-2 block
                                        text-sm font-medium
                                        text-[#03373D]
                                    "
                                >
                                    Phone Number
                                </label>

                                <div className="relative">
                                    <FaPhone
                                        className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input
                                        name="phone"
                                        type="tel"
                                        defaultValue={user?.phone || ''}
                                        placeholder="Enter your phone number"
                                        className="
                                            h-12 w-full rounded-xl
                                            border border-gray-200
                                            bg-white pl-11 pr-4
                                            text-sm text-[#03373D]
                                            outline-none
                                            transition
                                            placeholder:text-gray-400
                                            focus:border-[#CAEB66]
                                            focus:ring-4 focus:ring-[#CAEB66]/20
                                        "
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label
                                    className="
                                        mb-2 block
                                        text-sm font-medium
                                        text-[#03373D]
                                    "
                                >
                                    Address
                                </label>

                                <div className="relative">
                                    <FaMapMarkerAlt
                                        className="
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input
                                        name="address"
                                        type="text"
                                        defaultValue={user?.address || ''}
                                        placeholder="Enter your address"
                                        className="
                                            h-12 w-full rounded-xl
                                            border border-gray-200
                                            bg-white pl-11 pr-4
                                            text-sm text-[#03373D]
                                            outline-none
                                            transition
                                            placeholder:text-gray-400
                                            focus:border-[#CAEB66]
                                            focus:ring-4 focus:ring-[#CAEB66]/20
                                        "
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Security */}
                    <div className="mt-7 border-t border-gray-100 pt-7">

                        <div className="mb-5 flex items-center gap-3">
                            <div
                                className="
                                    flex h-10 w-10
                                    items-center justify-center
                                    rounded-xl
                                    bg-[#03373D]/10
                                    text-[#03373D]
                                "
                            >
                                <FaLock />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#03373D]">
                                    Account Security
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Manage your account security settings.
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                flex flex-col gap-4
                                rounded-xl
                                border border-gray-100
                                bg-gray-50
                                p-5
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div>
                                <p className="text-sm font-semibold text-[#03373D]">
                                    Change Password
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Keep your account secure by using a strong
                                    password.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="
                                    rounded-xl
                                    border border-gray-200
                                    bg-white
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    text-[#03373D]
                                    transition
                                    hover:bg-gray-100
                                "
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div
                        className="
                            mt-8 flex
                            justify-end gap-3
                            border-t border-gray-100
                            pt-6
                        "
                    >

                        <button
                            type="button"
                            onClick={() =>
                                navigate('/dashboard/profile')
                            }
                            className="
                                flex items-center gap-2
                                rounded-xl
                                border border-gray-200
                                bg-white
                                px-6 py-3
                                text-sm font-semibold
                                text-[#03373D]
                                transition
                                hover:bg-gray-50
                            "
                        >
                            <FaArrowLeft />
                            Back
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex items-center gap-2
                                rounded-xl
                                bg-[#03373D]
                                px-6 py-3
                                text-sm font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:opacity-90
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            <FaSave />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
