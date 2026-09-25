import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCreditCard, FaBox, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { PayPalButtons } from '@paypal/react-paypal-js';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel = [] } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    const handlePayment  = async () =>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            parcelId: parcel._id,
            trackingId: parcel.trackingId,
            // trackingNumber: parcel.trackingNumber
        }

        const res = await  axiosSecure.post('/create-stripe-checkout-session', paymentInfo);
        window.location.href = res.data.url;

    }

    //Paypal Payment
const createPayPalOrder = async (data, actions) => {
    console.log("🔥 CREATE ORDER START");

    const paymentInfo = {
        cost: parcel.cost,
        parcelName: parcel.parcelName,
        senderEmail: parcel.senderEmail,
        parcelId: parcel._id,
        trackingId: parcel.trackingId,
    };

    console.log("📦 Sending to backend:", paymentInfo);

    try {
        const res = await axiosSecure.post(
            '/create-paypal-order',
            paymentInfo
        );

        console.log("✅ Create Order Response:", res.data);

        return res.data.id;

    } catch (error) {
        console.error(
            "❌ Create Order Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};
const onPayPalApprove = async (data) => {

    console.log("🔥🔥🔥 PAYPAL ON APPROVE FIRED");
    console.log("PayPal Data:", data);

    const paymentInfo = {
        orderId: data.orderID,
        parcelId: parcel._id,
        parcelName: parcel.parcelName,
        senderEmail: parcel.senderEmail,
        cost: parcel.cost,
        trackingId: parcel.trackingId,
    };

    console.log("📦 Capture Payment Info:", paymentInfo);

    try {

        const res = await axiosSecure.post(
            '/capture-paypal-order',
            paymentInfo
        );

        console.log("✅ Capture Response:", res.data);

        if (res.data.success) {

            console.log("🎉 PAYMENT SUCCESS");

            window.location.href =
                `/dashboard/payment-success?transactionId=${res.data.transactionId}&trackingId=${res.data.trackingId}`;
        }

    } catch (error) {

        console.error(
            "❌ Capture API Error:",
            error.response?.data || error.message
        );
    }
};


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7faf9] px-4 py-8 md:px-8 lg:px-12">

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#03373D]">
                    Complete Your Payment
                </h1>
                <p className="text-[#606060] mt-2 text-base md:text-lg">
                    Review your parcel information and complete the payment.
                </p>
            </div>

            {/* Main Payment Card */}
            <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">

                {/* Parcel Information */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">

                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-full bg-[#e8f3f5] flex items-center justify-center text-[#03373D]">
                            <FaBox />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#03373D]">
                                Parcel Information
                            </h2>
                            <p className="text-sm text-gray-500">
                                Your parcel details
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        {/* Parcel Type */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-500">
                                Parcel Type
                            </span>

                            <span className="font-semibold text-[#03373D] capitalize">
                                {parcel.parcelType}
                            </span>
                        </div>

                        {/* Weight */}
                        {parcel.parcelWeight && (
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">
                                    Parcel Weight
                                </span>

                                <span className="font-semibold text-[#03373D]">
                                    {parcel.parcelWeight} kg
                                </span>
                            </div>
                        )}

                        {/* Sender */}
                        <div className="py-3 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <FaMapMarkerAlt className="text-[#03373D]" />
                                <span className="text-gray-500">
                                    Sender
                                </span>
                            </div>

                            <p className="font-semibold text-[#03373D]">
                                {parcel.senderRegion}, {parcel.senderDistrict}
                            </p>
                        </div>

                        {/* Receiver */}
                        <div className="py-3">
                            <div className="flex items-center gap-2 mb-2">
                                <FaMapMarkerAlt className="text-[#03373D]" />
                                <span className="text-gray-500">
                                    Receiver
                                </span>
                            </div>

                            <p className="font-semibold text-[#03373D]">
                                {parcel.reciverRegion} , {parcel.reciverDistrict}
                            </p>
                        </div>

                    </div>
                </div>


                {/* Payment Summary */}
                <div className="lg:col-span-2">
                    <div className="bg-[#03373D] text-white rounded-2xl p-6 md:p-8 shadow-sm sticky top-6">

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-11 h-11 rounded-full bg-[#CAEB66] flex items-center justify-center text-[#03373D]">
                                <FaCreditCard />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">
                                    Payment Summary
                                </h2>

                                <p className="text-white/60 text-sm">
                                    Secure checkout
                                </p>
                            </div>
                        </div>

                        {/* Cost */}
                        <div className="flex items-center justify-between pb-5 border-b border-white/20">
                            <span className="text-white/70">
                                Delivery Charge
                            </span>

                            <span className="text-2xl font-bold">
                                ৳{parcel.cost}
                            </span>
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between py-6">
                            <span className="text-lg font-medium">
                                Total Amount
                            </span>

                            <span className="text-3xl font-bold text-[#CAEB66]">
                                ৳{parcel.cost}
                            </span>
                        </div>

                        {/* Pay Button */}
                        <button onClick={handlePayment}
                            className="w-full mb-2 bg-[#CAEB66] hover:bg-white text-[#03373D] font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-3 transition duration-300"
                        >
                            Pay With Stripe
                            <FaArrowRight />
                        </button>
                        {/* Pay Button */}
                          <div className="w-full bg-white rounded-xl p-2">
                            <PayPalButtons
                                style={{
                                    layout: 'vertical',
                                    shape: 'rect',
                                    label: 'paypal',
                                    height: 50,
                                }}

                                createOrder={createPayPalOrder}

                                onApprove={onPayPalApprove}

                                onCancel={(data) => {
                                    console.log("⚠️ PAYPAL CANCELLED:", data);
                                }}

                                onError={(error) => {
                                    console.error("❌ PAYPAL BUTTON ERROR:", error);
                                }}
                            />
                        </div>

                        <p className="text-center text-xs text-white/50 mt-5">
                            Your payment information is securely processed.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;