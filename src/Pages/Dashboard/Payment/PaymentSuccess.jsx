import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaCheck, FaCopy } from 'react-icons/fa';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    });
                });
        }
    }, [sessionId, axiosSecure]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className=" flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 px-6 md:px-10 py-10">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                        <FaCheck className="text-4xl text-[#03373D]" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mt-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#03373D]">
                        Payment Successful!
                    </h2>

                    <p className="text-gray-500 text-[17px] mt-3">
                        Your payment has been completed successfully.
                    </p>

                    <p className="text-gray-500 text-[16px] mt-1">
                        Your parcel is now ready for processing.
                    </p>
                </div>

                {/* Payment Details */}
                <div className="mt-8 space-y-4">

                    {/* Transaction ID */}
                    <div className="bg-[#F5F7F7] border border-gray-200 rounded-xl p-5">
                        <p className="text-gray-500 text-[15px] font-medium mb-2">
                            Transaction ID
                        </p>

                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-[#03373D] text-[17px] md:text-[19px] font-semibold break-all">
                                {paymentInfo.transactionId || 'Loading...'}
                            </h3>

                            {paymentInfo.transactionId && (
                                <button
                                    onClick={() =>
                                        handleCopy(paymentInfo.transactionId)
                                    }
                                    className="w-10 h-10 shrink-0 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-primary transition cursor-pointer"
                                >
                                    <FaCopy className="text-[#03373D]" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tracking ID */}
                    <div className="bg-[#F5F7F7] border border-gray-200 rounded-xl p-5">
                        <p className="text-gray-500 text-[15px] font-medium mb-2">
                            Parcel Tracking ID
                        </p>

                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-[#03373D] text-xl md:text-2xl font-bold break-all">
                                {paymentInfo.trackingId || 'Loading...'}
                            </h3>

                            {paymentInfo.trackingId && (
                                <button
                                    onClick={() =>
                                        handleCopy(paymentInfo.trackingId)
                                    }
                                    className="w-10 h-10 shrink-0 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-primary transition cursor-pointer"
                                >
                                    <FaCopy className="text-[#03373D]" />
                                </button>
                            )}
                        </div>
                    </div>

                </div>

                {/* Notice */}
                <div className="mt-6 bg-[#F4FBE2] border border-primary rounded-xl p-4 text-center">
                    <p className="text-[#03373D] text-[16px]">
                        Please keep your tracking ID safe. You can use it to
                        track your parcel anytime.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <Link
                        to="/dashboard/my-parcels"
                        className="bg-primary hover:bg-[#b9dc55] text-[#03373D] text-[17px] font-semibold px-8 py-3 rounded-lg text-center transition"
                    >
                        View My Parcels
                    </Link>

                    <Link
                        to="/"
                        className="border border-[#03373D] text-[#03373D] hover:bg-[#03373D] hover:text-white text-[17px] font-semibold px-8 py-3 rounded-lg text-center transition"
                    >
                        Back to Home
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default PaymentSuccess;