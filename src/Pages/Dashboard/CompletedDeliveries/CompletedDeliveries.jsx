import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaEye, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { MdPayments } from 'react-icons/md';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["parcels", user?.email, 'delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=delivered`,
            );
            return res.data;
        },
    });

    const calculatePayout = parcel =>{
        if(parcel.senderDistrict === parcel.reciverDistrict){
            return parcel.cost * 0.8;
        }else{
            return parcel.cost * 0.6;
        }
    }



    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div >

            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                            Completed Deliveries
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Here are all the parcels you have successfully delivered.
                        </p>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
                        <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                            <FaCheckCircle className="text-green-600 text-xl" />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Completed
                            </p>

                            <h3 className="text-xl font-bold text-[#03373D]">
                                {parcels.length}
                            </h3>
                        </div>
                    </div>

                </div>
            </div>


            {/* Empty State */}
            {parcels.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">

                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <FaCheckCircle className="text-gray-400 text-2xl" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-700">
                        No Completed Deliveries
                    </h3>

                    <p className="text-gray-500 mt-2">
                        You haven't completed any deliveries yet.
                    </p>

                </div>
            ) : (

                /* Table */
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    {/* Table Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-[#03373D]">
                            Delivery History
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Successfully delivered parcels
                        </p>
                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">
                                <tr className="text-left text-sm text-gray-600">

                                    <th className="px-6 py-4 font-semibold">
                                        #
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Parcel
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Receiver
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Address
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Phone
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Parcel Cost
                                    </th>
                                    <th className="px-6 py-4 font-semibold">
                                        Payout 
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-center">
                                        Action
                                    </th>

                                </tr>
                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {parcels.map((parcel, index) => (

                                    <tr
                                        key={parcel._id}
                                        className="hover:bg-gray-50 transition"
                                    >

                                        {/* Serial */}
                                        <td className="px-6 py-5 text-gray-500">
                                            {index + 1}
                                        </td>


                                        {/* Parcel */}
                                        <td className="px-6 py-5">

                                            <div>
                                                <p className="font-semibold text-[#03373D]">
                                                    {parcel.parcelName}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {parcel.parcelType}
                                                </p>
                                            </div>

                                        </td>


                                        {/* Receiver */}
                                        <td className="px-6 py-5">

                                            <p className="font-medium text-gray-700">
                                                {parcel.receiverName}
                                            </p>

                                        </td>


                                        {/* Address */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-start gap-2 max-w-[220px]">

                                                <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />

                                                <p className="text-sm text-gray-600">
                                                    {parcel.receiverAddress}
                                                </p>

                                            </div>

                                        </td>


                                        {/* Phone */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-2 text-gray-600">

                                                <FaPhone className="text-gray-400 text-sm" />

                                                <span className="text-sm">
                                                    {parcel.receiverPhone}
                                                </span>

                                            </div>

                                        </td>


                                        <td className="px-6 py-5">

                                            {parcel.cost} Taka

                                        </td>
                                        <td className="px-6 py-5">

                                           
                                            {calculatePayout(parcel)} Taka

                                        </td>


                                        {/* Action */}
                                        <td className="px-6 py-5 text-center">

                                           <div className="flex items-center justify-center gap-2">
                                            <NavLink
                                                to={`/dashboard/parcels-details/${parcel._id}`}
                                                title="View Details"
                                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-600"
                                            >
                                                <FaEye className="text-[17px]" />
                                            </NavLink>
                                           <button
                                                
                                                title="Cashout"
                                                className="w-9 h-9 flex items-center cursor-pointer justify-center rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white transition"
                                            >
                                                <MdPayments className="text-[17px]" />
                                            </button>
                                           </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
};

export default CompletedDeliveries;