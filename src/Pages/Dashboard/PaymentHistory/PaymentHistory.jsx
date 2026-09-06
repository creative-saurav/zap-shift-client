import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: parcels = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments-history?email=${user?.email}`
            );
            // console.log('Parcel History', res.data);
            return res.data;
        }
    });

    return (
        <div className="8">

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-7">
                Payment History
            </h2>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full min-w-[800px]">

                    {/* Table Head */}
                    <thead>
                        <tr className="bg-[#fafafa] border-b border-gray-200">
                            <th className="text-left px-5 py-4 text-[16px] font-medium text-gray-700">
                                Parcel Info
                            </th>

                            <th className="text-left px-5 py-4 text-[16px] font-medium text-gray-700">
                                Recipient Info
                            </th>

                            <th className="text-left px-5 py-4 text-[16px] font-medium text-gray-700">
                                Tracking Number
                            </th>

                            <th className="text-left px-5 py-4 text-[16px] font-medium text-gray-700">
                                Transaction ID
                            </th>
                            <th className="text-left px-5 py-4 text-[16px] font-medium text-gray-700">
                                Payment Info
                            </th>

                            
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr
                                key={parcel._id}
                                className="border-b border-gray-200 last:border-b-0 even:bg-[#f7f7f7]"
                            >

                                {/* Parcel Info */}
                                <td className="px-5 py-5 text-[16px] text-gray-700">
                                    {parcel.parcelName}
                                </td>

                                {/* Recipient Info */}
                                <td className="px-5 py-5 text-[16px] text-gray-700">
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            {parcel.receiverName || 'N/A'}
                                        </p>

                                        <p>
                                            {
                                            parcel.reciverDistrict ||
                                            parcel.reciverRegion ||
                                                'N/A'}
                                        </p>

                                        <p>
                                            {parcel.receiverPhone || ''}
                                        </p>
                                    </div>
                                </td>

                                {/* Tracking Number */}
                                <td className="px-5 py-5 text-[16px] text-gray-700">
                                    {parcel.trackingId}
                                </td>
                                {/* TransactionID Number */}
                                <td className="px-5 py-5 text-[16px] text-gray-700">
                                    {parcel.transactionId}
                                </td>

                                {/* Payment Info */}
                                <td className="px-5 py-5 text-[16px] text-gray-700">
                                    ৳ {parcel.amount} (Paid)
                                </td>

                               

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;