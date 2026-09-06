import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const ParcelsDetails = () => {
    const axiosSecure = useAxiosSecure();
    // const [parcel, setParcel] = useState(null);
    const {id} = useParams();
      //Tanstack Query
    const {isLoading, data : parcel = []} = useQuery({
      queryKey: ['parcel', id],
      queryFn: async()=>{
        const res = await axiosSecure.get(`parcels/${id}`);
        return res.data;
      }
    })
    //Normal UseEffect
    // useEffect(()=>{
    //     axiosSecure.get(`parcels/${id}`)
    //     .then((res) => {
    //     console.log("Parcel Details:", res.data);
    //     setParcel(res.data);
    //   })
    //   .catch((err) => {
    //     console.log("Failed to load parcel details:", err);
    //   });
    // },[id, axiosSecure]);
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    
    return (
        <div>

      {/* Page Title */}
      <h1 className="text-[32px] font-bold text-[#03373D] mb-7">
        Parcel Details
      </h1>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ================= SENDER INFO ================= */}
        <div className="bg-[#f5f5f5] rounded-xl p-5">

          <h2 className="text-[20px] font-bold text-[#27313f] mb-4">
            Sender Info
          </h2>

          <div className="space-y-2">

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Name
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.senderName}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Phone
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.senderPhone}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Email
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.senderEmail}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Region
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.senderDistrict}, {parcel.senderRegion}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Address
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.senderAddress}
              </span>
            </div>

          </div>
        </div>


        {/* ================= RECEIVER INFO ================= */}
        <div className="bg-[#f5f5f5] rounded-xl p-5">

          <h2 className="text-[20px] font-bold text-[#27313f] mb-4">
            Receiver Info
          </h2>

          <div className="space-y-2">

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Name
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.receiverName}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Phone
              </span>
              <span className="text-[16px] text-[#4b5563]">
               {parcel.receiverPhone}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Email
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.receiverEmail}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Region
              </span>
              <span className="text-[16px] text-[#4b5563]">
               {parcel.reciverDistrict}, {parcel.reciverRegion}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Address
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.receiverAddress}
              </span>
            </div>

          </div>
        </div>


        {/* ================= PARCEL DETAILS ================= */}
        <div className="bg-[#f5f5f5] rounded-xl p-5">

          <h2 className="text-[20px] font-bold text-[#27313f] mb-4">
            Parcel details
          </h2>

          <div className="space-y-2">

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Title
              </span>
              <span className="text-[16px] text-[#4b5563]">
               {parcel.parcelName}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Type
              </span>
              <span className="text-[16px] text-[#4b5563]">
                 {parcel.parcelType}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Weight
              </span>
              <span className="text-[16px] text-[#4b5563]">
               {parcel.parcelWeight} KG
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Charge
              </span>
              <span className="text-[16px] text-[#4b5563]">
                Tk {parcel.cost}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Status
              </span>
              <span className="text-[16px] text-[#4b5563]">
                Pending
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Pickup Instruction
              </span>
              <span className="text-[16px] text-[#4b5563]">
               {parcel.pickupInstruction}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Delivery Instruction
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.deliveryInstruction}
              </span>
            </div>

            <div className="flex">
              <span className="w-[95px] text-[16px] text-gray-400">
                Tracking Number
              </span>
              <span className="text-[16px] text-[#4b5563]">
                {parcel.trackingId}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
    );
};

export default ParcelsDetails;