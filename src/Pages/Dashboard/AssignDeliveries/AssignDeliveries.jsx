import React from "react";
import { FaCheckCircle, FaTimesCircle, FaEye, FaBoxOpen, FaTruck, FaCheckDouble } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["parcels", user?.email, 'driver-assigned'],
    // queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver-assigned`,
        //  `/parcels/rider?riderEmail=${user?.email}`,
      );
      return res.data;
    },
  });

 const updateStatus = (parcel, status) => {
    console.log('Assign Approve Parcel', parcel);

    const updateInfo = {
      status: status , 
      riderId:parcel.riderId,
      trackingId: parcel.trackingId
    };

    axiosSecure
        .patch(`/parcels/${parcel._id}/status`, updateInfo)
        .then(res => {
            if (res.data.modifiedCount) {

                let title = "";
                let text = "";
                let icon = "success";

                if (status === 'rider-accepted') {
                    title = "Parcel Accepted!";
                    text = "You have successfully accepted this parcel for delivery.";
                    icon = "success";

                } else if (status === 'rejected') {
                    title = "Parcel Rejected!";
                    text = "You have rejected this parcel. It has been returned to pending pickup.";
                    icon = "warning";

                } else if (status === 'parcel-picked-up') {
                    title = "Parcel Picked Up!";
                    text = "You have successfully picked up the parcel from the sender.";
                    icon = "success";

                } else if (status === 'out-for-delivery') {
                    title = "Delivery Started!";
                    text = "The parcel is now out for delivery to the receiver.";
                    icon = "info";

                } else if (status === 'delivered') {
                    title = "Parcel Delivered!";
                    text = "The parcel has been successfully delivered to the receiver.";
                    icon = "success";
                }

                Swal.fire({
                    title,
                    text,
                    icon
                });

                refetch();
            }
        })
        .catch(() => {
            toast.error("Parcel Status Update Failed!");
        });
};


const handleApprove = (parcel) => {
    updateStatus(parcel, 'rider-accepted');
};

const handleReject = (parcel) => {
    updateStatus(parcel, 'rejected');
};

const handlePickUp = (parcel) => {
    updateStatus(parcel, 'parcel-picked-up');
};

const handleStartDelivery = (parcel) => {
    updateStatus(parcel, 'out-for-delivery');
};

const handleDelivered = (parcel) => {
    updateStatus(parcel, 'delivered');
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      
          {/* Header */}
          <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                          Assign Parcels
                      </h2>

                      <p className="text-gray-500 mt-1">
                          Here are all the parcels you have successfully Assign.
                      </p>
                  </div>

                  {/* Total */}
                  <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
                      <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                          <FaCheckCircle className="text-green-600 text-xl" />
                      </div>

                      <div>
                          <p className="text-sm text-gray-500">
                              Total Assign
                          </p>

                          <h3 className="text-xl font-bold text-[#03373D]">
                              {parcels.length}
                          </h3>
                      </div>
                  </div>

              </div>
          </div>


      {/* Assigned Parcels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-[#03373D]">
            Assigned Parcels
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                {/* 01 */}
                <th className="px-5 py-4 font-semibold">#</th>

                {/* 02 */}
                <th className="px-5 py-4 font-semibold">Parcel Info</th>

                {/* 03 */}
                <th className="px-5 py-4 font-semibold">Sender</th>

                {/* 04 */}
                <th className="px-5 py-4 font-semibold">Receiver</th>

                {/* 05 */}
                <th className="px-5 py-4 font-semibold">Pickup</th>

                {/* 06 */}
                <th className="px-5 py-4 font-semibold">Delivery</th>

                {/* 07 */}
                <th className="px-5 py-4 font-semibold">Status</th>

                {/* 08 */}
                <th className="px-5 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {parcels.map((parcel, index) => (
                <tr className="hover:bg-gray-50 transition" key={parcel._id}>
                  {/* # */}
                  <td className="px-5 py-5 text-gray-600">{index + 1}</td>

                  {/* Parcel Info */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-semibold text-[#03373D]">
                        {parcel.parcelName}
                      </p>

                      <p className="text-sm text-gray-500 capitalize">
                        {parcel.parcelType}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {parcel.trackingId}
                      </p>
                    </div>
                  </td>

                  {/* Sender */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {parcel.senderName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {parcel.senderPhone}
                      </p>
                    </div>
                  </td>

                  {/* Receiver */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {parcel.receiverName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {parcel.receiverPhone}
                      </p>
                    </div>
                  </td>

                  {/* Pickup */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {parcel.senderDistrict}
                      </p>

                      <p className="text-sm text-gray-500">
                        {parcel.senderRegion}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {parcel.senderAddress}
                      </p>
                    </div>
                  </td>

                  {/* Delivery */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {parcel.reciverDistrict}
                      </p>

                      <p className="text-sm text-gray-500">
                        {parcel.reciverRegion}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {parcel.receiverAddress}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                   
                 {
                    parcel.deliveryStatus === 'driver-assigned' ? (
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                        Driver Assigned
                      </span>
                    ) : parcel.deliveryStatus === 'rider-accepted' ? (
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        Rider Accepted
                      </span>
                    ) : parcel.deliveryStatus === 'parcel-picked-up' ? (
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                        Parcel Picked Up
                      </span>
                    ) : parcel.deliveryStatus === 'out-for-delivery' ? (
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                        Out for Delivery
                      </span>
                    ) : parcel.deliveryStatus === 'delivered' ? (
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                        {parcel.deliveryStatus}
                      </span>
                    )
                  }
                    
                  </td>

                  {/* Action */}
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <NavLink
                      to={`/dashboard/parcels-details/${parcel._id}`}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                        title="View Details"
                      >
                        <FaEye />
                      </NavLink>

                    {parcel.deliveryStatus === 'driver-assigned' ? (
                            <>
                                {/* Approve */}
                                <button
                                    onClick={() => handleApprove(parcel)}
                                    className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition"
                                    title="Approve"
                                >
                                    <FaCheckCircle />
                                </button>

                                {/* Reject */}
                                <button
                                    onClick={() => handleReject(parcel)}
                                    className="w-9 h-9 cursor-pointer flex items-center justify-center cursor-pointer rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                                    title="Reject"
                                >
                                    <FaTimesCircle />
                                </button>
                            </>
                        ) : parcel.deliveryStatus === 'rider-accepted' ? (
                            <>
                                {/* Pick Up */}
                                <button
                                    onClick={() => handlePickUp(parcel)}
                                    className="w-9 h-9 flex items-center cursor-pointer justify-center rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white transition"
                                    title="Pick Up"
                                >
                                    <FaBoxOpen />
                                </button>
                            </>
                        ) : parcel.deliveryStatus === 'parcel-picked-up' ? (
                            <>
                                {/* Start Delivery */}
                                <button
                                    onClick={() => handleStartDelivery(parcel)}
                                    className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                                    title="Start Delivery"
                                >
                                    <FaTruck />
                                </button>
                            </>
                        ) : parcel.deliveryStatus === 'out-for-delivery' ? (
                            <>
                                {/* Delivered */}
                                <button
                                    onClick={() => handleDelivered(parcel)}
                                    className="w-9 h-9 cursor-pointer flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition"
                                    title="Delivered"
                                >
                                    <FaCheckCircle />
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Delivered */}
                                <button disabled
                                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 text-green-600"
                                    title="Delivered"
                                >
                                    <FaCheckDouble />
                                </button>
                            </>
                        )}
                     


                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignDeliveries;
