import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import {
    FaCheckCircle,
    FaBox,
    FaMotorcycle,
    FaTruck,
    FaMapMarkerAlt,
    FaBoxOpen,
    FaClock
} from 'react-icons/fa';

const ParcelTrack = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    const { data: tracking = [], isLoading } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/trackings/${trackingId}/log`
            );
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

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
        return <FaBoxOpen />;
    }

    if (status === 'out-for-delivery') {
        return <FaMotorcycle />;
    }

    if (status === 'delivered') {
        return <FaMapMarkerAlt />;
    }

    return <FaTruck />;
};

    const getStatusTitle = (status) => {
        if (status === 'pending-pickup') return 'Pending Pickup';
        if (status === 'rider-accepted') return 'Rider Accepted';
        if (status === 'parcel-picked-up') return 'Parcel Picked Up';
        if (status === 'out-for-delivery') return 'Out for Delivery';
        if (status === 'delivered') return 'Delivered';

        return status;
    };

    return (
        <div className="min-h-screen p-4 md:p-8">

            {/* Header */}
            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <FaTruck className="text-[#03373D] text-2xl" />

                                <h2 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                                    Track Your Parcel
                                </h2>
                            </div>

                            <p className="text-gray-500">
                                Follow your parcel's delivery progress
                            </p>
                        </div>

                        {/* Tracking ID */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3">
                            <p className="text-xs text-gray-500 mb-1">
                                Tracking ID
                            </p>

                            <p className="font-bold text-[#03373D]">
                                {trackingId}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Tracking Timeline */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">

                    <div className="mb-7">
                        <h3 className="text-xl font-bold text-[#03373D]">
                            Delivery Updates
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Latest updates about your parcel
                        </p>
                    </div>


                    {tracking.length === 0 ? (

                        <div className="py-12 text-center">

                            <FaBox className="text-4xl text-gray-300 mx-auto mb-4" />

                            <h3 className="text-lg font-semibold text-gray-600">
                                No Tracking Information
                            </h3>

                            <p className="text-gray-400 mt-1">
                                Tracking information is not available yet.
                            </p>

                        </div>

                    ) : (

                        <div className="relative">

                            {tracking.map((item, index) => {

                                const isLast = index === tracking.length - 1;

                                return (
                                    <div
                                        key={item._id}
                                        className="relative flex gap-4 md:gap-6"
                                    >

                                        {/* Timeline */}
                                        <div className="flex flex-col items-center">

                                            {/* Icon */}
                                            <div className={`
                                                w-11 h-11 rounded-full
                                                flex items-center justify-center
                                                text-lg shrink-0
                                                ${
                                                    isLast
                                                        ? 'bg-primary text-black'
                                                        : 'bg-green-100 text-green-600'
                                                }
                                            `}>
                                                {getStatusIcon(item.status)}
                                            </div>


                                            {/* Line */}
                                            {!isLast && (
                                                <div className="w-[2px] h-20 bg-green-200"></div>
                                            )}

                                        </div>


                                        {/* Content */}
                                        <div className="pb-8 flex-1">

                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                                                <div>

                                                    <h4 className="font-bold text-[#03373D] text-lg capitalize">
                                                         {item.detail}
                                                    </h4>

                                                    {/* <p className="text-gray-500 text-sm mt-1">
                                                        {item.detail}
                                                    </p> */}

                                                </div>


                                                {/* Date */}
                                                <div className="text-left md:text-right">

                                                    <p className="text-sm font-medium text-gray-600">
                                                        {new Date(item.createdAt).toLocaleDateString(
                                                            'en-GB',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            }
                                                        )}
                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {new Date(item.createdAt).toLocaleTimeString(
                                                            'en-US',
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    )}

                </div>


                {/* Current Status */}
                {tracking.length > 0 && (
                    <div className="mt-6 bg-[#03373D] rounded-2xl p-6 text-white">

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center">
                                {getStatusIcon(
                                    tracking[tracking.length - 1].status
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-gray-300">
                                    Current Status
                                </p>

                                <h3 className="text-xl font-bold capitalize">
                                    {getStatusTitle(
                                        tracking[tracking.length - 1].status
                                    )}
                                </h3>
                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default ParcelTrack;