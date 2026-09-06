import React from 'react';
import { Link } from 'react-router';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-[#f7faf5] flex items-center justify-center px-6">
            <div className="text-center max-w-xl">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-[#CAEB66] flex items-center justify-center">
                        <FaLock className="text-[#03373D] text-4xl" />
                    </div>
                </div>

                {/* 403 */}
                <h1 className="text-[100px] md:text-[130px] leading-none font-extrabold text-[#03373D]">
                    403
                </h1>

                <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mt-4">
                    Access Forbidden
                </h2>

                <p className="text-[17px] md:text-[18px] text-gray-500 leading-7 mt-4">
                    Sorry, you don't have permission to access this page.
                    Please go back to your dashboard and continue from there.
                </p>

                {/* Button */}
                <div className="mt-8">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-3 bg-[#CAEB66] hover:bg-[#bce05d] text-[#03373D] px-7 py-3.5 rounded-lg text-[16px] font-bold transition"
                    >
                        <FaArrowLeft />
                        Back to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Forbidden;