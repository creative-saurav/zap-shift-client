import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaTimes, FaEye, FaTrash, FaTrashAlt, FaRegEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { TbPlayerEject } from 'react-icons/tb';
import { NavLink } from 'react-router';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    const updateStatus = (rider, status) => {
            // console.log('Rider Info:', rider);
            // console.log('Status:', status);

            const updateInfo = {status: status, email: rider.email }
            Swal.fire({
                title: "Are you sure?",
                text: `You want to ${status} this rider?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, ${status}!`
            }).then((result) => {

                if (result.isConfirmed) {
                    axiosSecure
                        .patch(`/riders/${rider._id}`, updateInfo)
                        .then(res => {
                            // console.log('Updated data:', res.data);
                            if (res.data.modifiedCount) {
                                Swal.fire({
                                    title: "Success!",
                                    text: `Rider ${status} successfully.`,
                                    icon: "success"
                                });

                                refetch();
                            }
                        })
                        .catch(() => {
                            // console.log(error);
                            toast.error(`${status} Failed!`);
                        });
                }
            });
        };
        const handleApprove = (rider) => {
            updateStatus(rider, 'approved');
        };
        const handleReject = (rider) => {
            updateStatus(rider, 'rejected');
        };

        const handleDelete = (id) =>{
            Swal.fire({
                title: "Are you sure?",
                text: `You want to delete this rider?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, Delete!`
            }).then((result) => {

                if (result.isConfirmed) {
                    axiosSecure
                        .delete(`/riders/${id}`)
                        .then(res => {
                             console.log('Updated data:', res.data);
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    title: "Success!",
                                    text: `Riders delete successfully.`,
                                    icon: "success"
                                });

                                refetch();
                            }
                        })
                        .catch(() => {
                            // console.log(error);
                            toast.error('Riders Delete Failed!');
                        });
                }
            });
        }

    return (
        <div >

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#03373D]">
                    Approve Riders
                </h2>

                <p className="text-gray-500 text-lg mt-2">
                    Total Applications: <span className="font-semibold text-[#03373D]">
                        {riders.length}
                    </span>
                </p>
            </div>


            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        {/* Table Head */}
                        <thead className="bg-[#f5f8f4]">
                            <tr>
                                <th className="px-6 py-5 text-base font-semibold text-[#03373D]">
                                    #
                                </th>

                                <th className="px-6 py-5 text-base font-semibold text-[#03373D]">
                                    Rider
                                </th>

                                <th className="px-6 py-5 text-base font-semibold text-[#03373D]">
                                    Contact
                                </th>
                                <th className="px-6 py-5 text-base font-semibold text-[#03373D]">
                                    Applied
                                </th>

                                <th className="px-6 py-5 text-base font-semibold text-[#03373D]">
                                    Status
                                </th>
                                <th className="px-6 py-5 text-base font-semibold text-[#03373D]">
                                    Work Status
                                </th>

                                <th className="px-6 py-5 text-base font-semibold text-[#03373D] text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>


                        {/* Table Body */}
                        <tbody>

                            {riders.map((rider, index) => (

                                <tr
                                    key={rider._id}
                                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                                >

                                    {/* Serial */}
                                    <td className="px-6 py-5 text-base text-gray-600">
                                        {index + 1}
                                    </td>


                                    {/* Rider */}
                                    <td className="px-6 py-5">
                                        <div>
                                            <h4 className="text-base font-semibold text-[#03373D]">
                                                {rider.name}
                                            </h4>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {rider.email}
                                            </p>
                                        </div>
                                    </td>


                                    {/* Contact */}
                                    <td className="px-6 py-5">
                                        <p className="text-base text-gray-600">
                                            {rider.phone}
                                        </p>
                                    </td>
                                    {/* Applied Date */}
                                    <td className="px-6 py-5">
                                        <p className="text-base text-gray-600">
                                            {new Date(rider.createdAt).toLocaleDateString(
                                                'en-GB',
                                                {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }
                                            )}
                                        </p>
                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold
                                                ${
                                                    rider.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : rider.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : rider.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }
                                            `}
                                        >
                                            {rider.status}
                                        </span>
                                    </td>
                                    {/* Work Status */}
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold
                                                ${
                                                    rider.workStatus === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : rider.workStatus === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : rider.workStatus === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }
                                            `}
                                        >
                                            {rider.workStatus}
                                        </span>
                                    </td>


                                    {/* Action */}
                                    <td className="px-6 py-5">

                                        <div className="flex items-center justify-center gap-2">
                                            {/* View */}
                                            <NavLink to={`/dashboard/approve-riders-details/${rider._id}`}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#CAEB66] text-[#03373D] hover:bg-[#03373D] hover:text-white transition"
                                                title="View"
                                            >
                                               <FaRegEye />


                                            </NavLink>
                                            {/* Approve */}
                                            <button onClick={()=> handleApprove(rider)}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#CAEB66] text-[#03373D] hover:bg-[#03373D] hover:text-white transition"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>

                                            {/* Reject */}
                                            <button onClick={()=> handleReject(rider)}
                                                 type="button"
                                               className="btn btn-square hover:bg-primary"
                                                  title="Reject"
                                            >
                                                <TbPlayerEject />

                                            </button>
                                            {/* Delete */}
                                            <button onClick={()=> handleDelete(rider._id)}
                                                 type="button"
                                               className="btn btn-square hover:bg-primary"
                                                  title="Delete"
                                            >
                                                <FaTrashAlt />
                                            </button>


                                            

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>


                {/* Empty State */}
                {riders.length === 0 && (
                    <div className="py-16 text-center">
                        <h3 className="text-xl font-semibold text-[#03373D]">
                            No Rider Applications Found
                        </h3>

                        <p className="text-gray-500 mt-2 text-base">
                            There are currently no pending rider applications.
                        </p>
                    </div>
                )}

            </div>

        </div>
    );
};

export default ApproveRiders;