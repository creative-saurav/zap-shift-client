import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle, FaArrowLeft, FaRedo } from 'react-icons/fa';

const PaymentCancel = () => {
    return (
        <div className=" flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 md:p-10 text-center">

                {/* Failed Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                        <FaTimesCircle className="text-red-500 text-6xl" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-3">
                    Payment Failed
                </h1>

                <p className="text-gray-500 text-base md:text-lg leading-7 max-w-md mx-auto">
                    Unfortunately, your payment could not be completed.
                    Please try again or choose another payment method.
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 my-7"></div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">

                    <button
                        onClick={() => window.history.back()}
                        className="bg-primary text-[#03373D] rounded-full px-7 py-3 font-semibold flex items-center justify-center gap-2 hover:bg-secondary hover:text-white transition"
                    >
                        <FaRedo />
                        Try Again
                    </button>

                    <Link
                        to="/dashboard/my-parcels"
                        className="border border-gray-300 rounded-full px-7 py-3 font-semibold text-[#03373D] flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                    >
                        <FaArrowLeft />
                        Back to My Parcels
                    </Link>

                </div>

                {/* Help Text */}
                <p className="text-sm text-gray-400 mt-7">
                    If money was deducted from your account, please contact support.
                </p>

            </div>
        </div>
    );
};

export default PaymentCancel;