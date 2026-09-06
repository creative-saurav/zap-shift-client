import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {  useQuery } from '@tanstack/react-query';
import {  FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const modalRef = useRef();
    const [selectedParcels , setSelectedParcels] = useState(null);

    const { data: parcels = [], isLoading, refetch: parcelsRefetch} = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels?deliveryStatus=pending-pickup`
            );
            return res.data;
        }
    });

    const {data: riders = [], refetch: riderRefetch} = useQuery({
        queryKey: ['riders', selectedParcels?.senderDistrict, 'available'],
        enabled: !!selectedParcels,
        queryFn: async () =>{
            const res  = await axiosSecure.get(`/riders?status=approved&district=${selectedParcels?.senderDistrict}&workStatus=available`);
            // console.log(res.data);
            return res.data;
        }

    })


    const openHandleAssignRiderModal = (parcel) => {
        // console.log('Assign Rider To:', parcel);
        setSelectedParcels(parcel);
        modalRef.current.showModal();
    };

    const handleAssignRiders = rider =>{
        const riderInfo = {
            riderId: rider._id, 
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcels._id,
            trakingId: selectedParcels.trakingId,
        }

        axiosSecure.patch(`/parcels/${selectedParcels._id}`, riderInfo)
        .then(async res=>{
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Success!",
                    text: 'Rider has beed assigned successfully.',
                    icon: "success"
                });
                await parcelsRefetch();
                await riderRefetch();
                modalRef.current.close();
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }




    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                    Assign Riders
                </h2>

                <p className="text-gray-500 mt-1">
                    Assign available riders to ready pickup parcels
                </p>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Total Ready Pickup Parcels
                        </p>

                        <h3 className="text-3xl font-bold text-[#03373D] mt-1">
                            {parcels.length}
                        </h3>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-[#CAEB66] flex items-center justify-center">
                        <FaUserCheck className="text-[#03373D] text-xl" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        {/* Table Head */}
                        <thead className="bg-[#f6f8f8]">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    #
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Parcel
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Receiver
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Destination
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Cost
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Status
                                </th>


                                <th className="px-6 py-4 text-sm font-semibold text-[#03373D]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-100">

                            {parcels.map((parcel, index) => (

                                <tr
                                    key={parcel._id}
                                    className="hover:bg-gray-50 transition"
                                >

                                    {/* Serial */}
                                    <td className="px-6 py-5 text-gray-600 font-medium">
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
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                {parcel.receiverName}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {parcel.receiverPhone}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Destination */}
                                    <td className="px-6 py-5">
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                {parcel.reciverDistrict}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {parcel.reciverRegion}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Cost */}
                                    <td className="px-6 py-5">
                                        <span className="font-semibold text-[#03373D]">
                                            ৳ {parcel.cost}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        <span className="inline-flex capitalize px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                                            {parcel.deliveryStatus}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-5">
                                        <button
                                            onClick={() =>
                                                openHandleAssignRiderModal(parcel)
                                            }
                                            className="inline-flex items-center gap-2 bg-[#CAEB66] hover:bg-[#bce653] text-[#03373D] px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
                                        >
                                            <FaUserCheck />
                                            Find Riders
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {parcels.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="text-gray-500 text-lg">
                            No parcels are ready for pickup.
                        </p>
                    </div>
                )}

            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
               <dialog
                    ref={modalRef}
                    className="modal modal-bottom sm:modal-middle"
                >
                    <div className="modal-box max-w-5xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="font-bold text-2xl text-[#03373D]">
                                    Assign Rider
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Available riders for pickup
                                </p>
                            </div>

                            <div className="badge badge-lg bg-[#CAEB66] text-[#03373D] border-none font-semibold">
                                {riders.length} Available
                            </div>
                        </div>

                        {/* Selected Parcel Info */}
                        {selectedParcels && (
                            <div className="bg-[#f6f8f8] rounded-lg p-4 mb-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Parcel
                                        </p>
                                        <p className="font-semibold text-[#03373D]">
                                            {selectedParcels.parcelName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Receiver
                                        </p>
                                        <p className="font-semibold text-[#03373D]">
                                            {selectedParcels.receiverName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Pickup District
                                        </p>
                                        <p className="font-semibold text-[#03373D]">
                                            {selectedParcels.senderDistrict}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Riders Table */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">

                            {riders.length > 0 ? (

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">

                                        {/* Table Header */}
                                        <thead className="bg-[#f6f8f8]">
                                            <tr>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D]">
                                                    #
                                                </th>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D]">
                                                    Rider
                                                </th>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D]">
                                                    Phone
                                                </th>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D]">
                                                    Region
                                                </th>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D]">
                                                    District
                                                </th>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D]">
                                                    Status
                                                </th>

                                                <th className="px-5 py-4 text-sm font-semibold text-[#03373D] text-center">
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>

                                        {/* Table Body */}
                                        <tbody className="divide-y divide-gray-100">

                                            {riders.map((rider, index) => (

                                                <tr
                                                    key={rider._id}
                                                    className="hover:bg-gray-50 transition"
                                                >

                                                    {/* Serial */}
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {index + 1}
                                                    </td>

                                                    {/* Rider */}
                                                    <td className="px-5 py-4">
                                                        <div>
                                                            <p className="font-semibold text-[#03373D]">
                                                                {rider.name}
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                {rider.email}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    {/* Phone */}
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {rider.phone}
                                                    </td>

                                                    {/* Region */}
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {rider.riderRegion}
                                                    </td>

                                                    {/* District */}
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {rider.riderDistrict}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">
                                                            {rider.workStatus}
                                                        </span>
                                                    </td>

                                                    {/* Assign */}
                                                    <td className="px-5 py-4 text-center">

                                                        <button
                                                            onClick={() => handleAssignRiders(rider)}
                                                            className="inline-flex items-center gap-2 bg-[#CAEB66] hover:bg-[#bce653] text-[#03373D] px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
                                                        >
                                                            <FaUserCheck />
                                                            Assign
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>
                                </div>

                            ) : (

                                /* No Rider */
                                <div className="py-12 text-center">
                                    <p className="text-gray-500 font-medium">
                                        No available rider found for this district.
                                    </p>
                                </div>

                            )}

                        </div>

                        {/* Modal Footer */}
                        <div className="modal-action">

                            <form method="dialog">
                                <button className="btn">
                                    Close
                                </button>
                            </form>

                        </div>

                    </div>
                </dialog>

        </div>
    );
};

export default AssignRiders;