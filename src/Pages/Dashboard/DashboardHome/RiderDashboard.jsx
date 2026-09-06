
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import {
    FaBoxOpen,
    FaCheckCircle,
    FaCalendarDay,
    FaMotorcycle,
} from 'react-icons/fa';

const RiderDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: delivered = [] } = useQuery({
        queryKey: ['riders-parcel-delivery', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/delivery-per-days?email=${user?.email}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Total delivered parcels
    const totalDelivered = delivered.reduce(
        (total, item) => total + item.deliveryCount,
        0
    );

    // Today's delivery
    const today = new Date().toISOString().split('T')[0];

    const todayDelivery =
        delivered.find((item) => item._id === today)?.deliveryCount || 0;

    return (
        <div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                   Delivery Overview
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage your deliveries and keep track of your daily progress.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* Total Delivered */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                Total Delivered
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {totalDelivered}
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Parcels delivered
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-[#CAEB66]/30 flex items-center justify-center">
                            <FaCheckCircle className="text-2xl text-[#03373D]" />
                        </div>

                    </div>
                </div>


                {/* Today's Delivery */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                Today's Delivery
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {todayDelivery}
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Delivered today
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-[#CAEB66]/30 flex items-center justify-center">
                            <FaCalendarDay className="text-2xl text-[#03373D]" />
                        </div>

                    </div>
                </div>


                {/* Delivery Days */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                Active Delivery Days
                            </p>

                            <h2 className="text-3xl font-bold text-[#03373D] mt-2">
                                {delivered.length}
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                Days completed
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-[#CAEB66]/30 flex items-center justify-center">
                            <FaMotorcycle className="text-2xl text-[#03373D]" />
                        </div>

                    </div>
                </div>

            </div>


            {/* Daily Delivery */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-[#CAEB66]/30 flex items-center justify-center">
                        <FaBoxOpen className="text-[#03373D]" />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#03373D]">
                            Daily Deliveries
                        </h2>

                        <p className="text-sm text-gray-400">
                            Your delivery performance by date
                        </p>
                    </div>

                </div>


                {/* Delivery List */}
                <div className="space-y-3">

                    {delivered.length > 0 ? (
                        [...delivered]
                            .reverse()
                            .map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between bg-[#f7f8f5] rounded-xl px-4 py-3"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                                            <FaCalendarDay className="text-[#03373D]" />
                                        </div>

                                        <div>
                                            <p className="font-semibold text-[#03373D]">
                                                {item._id}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Delivery completed
                                            </p>
                                        </div>

                                    </div>


                                    <div className="text-right">

                                        <p className="text-lg font-bold text-[#03373D]">
                                            {item.deliveryCount}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            parcels
                                        </p>

                                    </div>

                                </div>
                            ))
                    ) : (
                        <div className="py-12 text-center">

                            <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-3" />

                            <p className="font-medium text-gray-500">
                                No delivery record found
                            </p>

                            <p className="text-sm text-gray-400 mt-1">
                                Your completed deliveries will appear here.
                            </p>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default RiderDashboard;

