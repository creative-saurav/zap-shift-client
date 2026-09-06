
import React from 'react';
import {
    FaBox,
    FaClock,
    FaMotorcycle,
    FaCheckCircle,
    FaArrowRight,
    FaPlus,
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

const UserDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: dashboard = {} } = useQuery({
        queryKey: ['customer-dashboard', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/customer/dashboard?email=${user?.email}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    const stats = dashboard?.stats || {};
    const recentParcels = dashboard?.recentParcels || [];

    const getStatusIcon = (status) => {
        if (status === 'parcel-created') {
            return <FaBox />;
        }

        if (status === 'pending-pickup') {
            return <FaClock />;
        }

        if (status === 'rider-accepted') {
            return <FaCheckCircle />;
        }

        if (status === 'parcel-picked-up') {
            return <FaBox />;
        }

        if (status === 'out-for-delivery') {
            return <FaMotorcycle />;
        }

        if (status === 'delivered') {
            return <FaCheckCircle />;
        }

        return <FaBox />;
    };

    const getStatusStyle = (status) => {
        if (status === 'delivered') {
            return 'bg-green-100 text-green-700';
        }

        if (status === 'pending-pickup' || status === 'parcel-created') {
            return 'bg-yellow-100 text-yellow-700';
        }

        if (
            status === 'rider-accepted' ||
            status === 'parcel-picked-up' ||
            status === 'out-for-delivery'
        ) {
            return 'bg-blue-100 text-blue-700';
        }

        return 'bg-gray-100 text-gray-600';
    };

    const getStatusText = (status) => {
        const statusMap = {
            'parcel-created': 'Parcel Created',
            'pending-pickup': 'Pending Pickup',
            'rider-accepted': 'Rider Accepted',
            'parcel-picked-up': 'Picked Up',
            'out-for-delivery': 'Out for Delivery',
            delivered: 'Delivered',
        };

        return statusMap[status] || status;
    };

    return (
        <div className="min-h-screen bg-[#f7f8f5] p-4 md:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                        Parcel Overview
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Keep track of your parcels, deliveries, and recent activity.
                    </p>
                </div>

            </div>


            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {/* Total Parcels */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Parcels
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {stats.totalParcels || 0}
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                All your parcels
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-[#CAEB66]/30 flex items-center justify-center">
                            <FaBox className="text-xl text-[#03373D]" />
                        </div>

                    </div>
                </div>


                {/* Pending */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Pending
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {stats.pending || 0}
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                Waiting for pickup
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                            <FaClock className="text-xl text-yellow-600" />
                        </div>

                    </div>
                </div>


                {/* In Progress */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                In Progress
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {stats.active || 0}
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                On the way
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <FaMotorcycle className="text-xl text-blue-600" />
                        </div>

                    </div>
                </div>


                {/* Delivered */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Delivered
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {stats.delivered || 0}
                            </h2>

                            <p className="text-xs text-gray-400 mt-1">
                                Successfully delivered
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <FaCheckCircle className="text-xl text-green-600" />
                        </div>

                    </div>
                </div>

            </div>


            {/* Recent Parcels */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm">

                {/* Section Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">

                    <div>
                        <h2 className="text-lg font-bold text-[#03373D]">
                            Recent Parcels
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Your latest parcel activity
                        </p>
                    </div>


                </div>


                {/* Parcel List */}
                {recentParcels.length > 0 ? (
                    <div>

                        {recentParcels.map((parcel, index) => (
                            <div
                                key={parcel._id}
                                className={`p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                                    index !== recentParcels.length - 1
                                        ? 'border-b border-gray-100'
                                        : ''
                                }`}
                            >

                                {/* Parcel Info */}
                                <div className="flex items-center gap-4">

                                    <div className="w-11 h-11 rounded-xl bg-[#CAEB66]/30 flex items-center justify-center">
                                        <FaBox className="text-[#03373D]" />
                                    </div>

                                     <NavLink to={`/parcel-tracking/${parcel.trackingId}`} target='_blank'>
                                        <h3 className="font-semibold text-[#03373D]">
                                            {parcel.parcelName}
                                        </h3>

                                       <p className="text-xs text-gray-400 mt-1">
                                            Tracking ID: {parcel.trackingId || 'N/A'}
                                        </p>
                                    </NavLink>

                                </div>


                                {/* Price + Status */}
                                <div className="flex items-center justify-between sm:justify-end gap-6">

                                    <span className="text-sm font-semibold text-[#03373D]">
                                        ৳{parcel.cost || 0}
                                    </span>

                                    <span
                                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusStyle(
                                            parcel.deliveryStatus
                                        )}`}
                                    >
                                        {getStatusIcon(parcel.deliveryStatus)}

                                        {getStatusText(parcel.deliveryStatus)}
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>
                ) : (
                    <div className="py-12 text-center">

                        <FaBox className="mx-auto text-4xl text-gray-300 mb-3" />

                        <p className="font-medium text-gray-500">
                            No parcels found
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                            Your recent parcels will appear here.
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
};

export default UserDashboard;

