import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaIdCard,
    FaMotorcycle,
    FaMapMarkerAlt,
    FaCalendarAlt
} from 'react-icons/fa';

const ApproveRidersDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { data: rider = [], isLoading } = useQuery({
        queryKey: ['rider', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8">
            {/* Heading */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#03373D]">
                    Rider Details
                </h2>
                <p className="text-[16px] text-gray-500 mt-2">
                    View complete rider information and verification details.
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                
                {/* Rider Header */}
                <div className="px-6 md:px-8 py-7 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-[#CAEB66] flex items-center justify-center">
                            <FaUser className="text-2xl text-[#03373D]" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-[#03373D]">
                                {rider.name}
                            </h3>

                            <p className="text-[16px] text-gray-500 mt-1">
                                Rider ID: {rider._id}
                            </p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex w-fit px-4 py-2 rounded-full text-[15px] font-semibold capitalize
                            ${
                                rider.status === 'approved'
                                    ? 'bg-green-100 text-green-700'
                                    : rider.status === 'rejected'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }
                        `}
                    >
                        {rider.status}
                    </span>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* Email */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaEnvelope className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    Email Address
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D] break-all">
                                {rider.email}
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaPhoneAlt className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    Phone Number
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.phone}
                            </p>
                        </div>

                        {/* NID */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaIdCard className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    NID Number
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.nidNumber}
                            </p>
                        </div>

                        {/* License */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaIdCard className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    License Number
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.licenseNumber}
                            </p>
                        </div>

                        {/* Bike */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaMotorcycle className="text-[#03373D] text-xl" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    Bike Information
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.bike}
                            </p>
                        </div>

                        {/* Bike License */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaMotorcycle className="text-[#03373D] text-xl" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    Bike License
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.bikeLicense}
                            </p>
                        </div>

                        {/* Region */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaMapMarkerAlt className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    Region
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.riderRegion}
                            </p>
                        </div>

                        {/* District */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaMapMarkerAlt className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    District
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.riderDistrict}
                            </p>
                        </div>

                        {/* Applied Date */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <FaCalendarAlt className="text-[#03373D] text-lg" />
                                <h4 className="text-[16px] font-semibold text-gray-500">
                                    Applied Date
                                </h4>
                            </div>

                            <p className="text-[18px] font-semibold text-[#03373D]">
                                {rider.createdAt &&
                                    new Date(rider.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6 border border-gray-200 rounded-xl p-6">
                        <h4 className="text-[18px] font-bold text-[#03373D] mb-3">
                            Rider Description
                        </h4>

                        <p className="text-[16px] leading-7 text-gray-600">
                            {rider.description || 'No description provided.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApproveRidersDetails;