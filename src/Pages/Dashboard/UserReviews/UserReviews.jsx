
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaPlus, FaStar, FaTrash, FaUserCircle } from 'react-icons/fa';
import EditReviews from './EditReviews';
import CreateReviews from './CreateReviews';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const UserReviews = () => {
    const axiosSecure = useAxiosSecure();

    const [editingReview, setEditingReview] = useState(null);
    const modalRef = useRef(null);

    const {
        data: reviews = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    // Edit button
    const handleEdit = (review) => {
        setEditingReview(review);
        modalRef.current.showModal();
    };

    // Create button
    const handleCreate = () => {
        setEditingReview(null);
        modalRef.current.showModal();
    };


        const handleDelete = (id)=>{
            Swal.fire({ 
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I Agree"
                }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure
                        .delete(`/reviews/${id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    title: "Success!",
                                    text: `Reviews delete successfully.`,
                                    icon: "success"
                                });
                                refetch();
                            }
                        })
                        .catch(() => {
                            toast.error('Review delete failed!');
                        });
                }
            });
            
        }


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#03373D]">
                        User Reviews
                    </h2>

                    <p className="text-gray-500 mt-1">
                        View and manage all user reviews.
                    </p>
                </div>

                {/* Create Review */}
                <button
                    onClick={handleCreate}
                    className="btn bg-[#CAEB66] hover:bg-[#b9dc55] border-none text-[#03373D]"
                >
                    <FaPlus />
                    Add Review
                </button>

            </div>


            {/* Reviews Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-[#03373D]">
                        All Reviews
                    </h3>

                    <span className="badge badge-neutral">
                        {reviews.length} Reviews
                    </span>

                </div>


                <div className="overflow-x-auto">

                    <table className="table w-full">

                        <thead>
                            <tr className="text-gray-600 bg-gray-50">
                                <th>#</th>
                                <th>User</th>
                                <th>Review</th>
                                <th>Rating</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>


                        <tbody>

                            {reviews.length > 0 ? (

                                reviews.map((review, index) => (

                                    <tr
                                        key={review._id}
                                        className="hover:bg-gray-50 transition"
                                    >

                                        {/* Serial */}
                                        <td className="font-medium text-gray-500">
                                            {index + 1}
                                        </td>


                                        {/* User */}
                                   
                                            <td>
                                                <div className="flex items-center gap-3">

                                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#CAEB66] bg-gray-100 shrink-0 flex items-center justify-center">
                                                        {review.image ? (
                                                            <img
                                                                src={review.image}
                                                                alt={review.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaUserCircle className="text-4xl text-gray-300" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-[#03373D]">
                                                            {review.name}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                        {/* Review */}
                                        <td>
                                            <p className="max-w-xs text-gray-600">
                                                {review.review}
                                            </p>
                                        </td>


                                        {/* Rating */}
                                        <td>

                                            <div className="flex items-center gap-1">

                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={
                                                            i < review.rating
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }
                                                    />
                                                ))}

                                                <span className="ml-1 font-semibold text-gray-600">
                                                    {review.rating}
                                                </span>

                                            </div>

                                        </td>


                                        {/* Action */}
                                        <td>

                                            <div className="flex justify-center items-center gap-3">

                                                {/* Edit */}
                                                <button
                                                    onClick={() => handleEdit(review)}
                                                    className="w-10 h-10 rounded-lg bg-[#e8f3f5] hover:bg-[#CAEB66] text-[#03373D] flex items-center justify-center transition"
                                                    title="Edit Review"
                                                >
                                                    <FaEdit />
                                                </button>


                                                {/* Delete */}
                                                <button
                                                    onClick={()=>handleDelete(review._id)}
                                                    className="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition"
                                                    title="Delete Review"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-12 text-gray-500"
                                    >
                                        No reviews found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>
            </div>


            {/* ================= DAISYUI MODAL ================= */}

            <dialog  ref={modalRef} className="modal modal-bottom sm:modal-middle">

                <div className="modal-box">

                    {/* Modal Header */}
                    <h3 className="font-bold text-xl text-[#03373D]">
                        {editingReview ? 'Edit Review' : 'Create Review'}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 mb-5">
                        {editingReview
                            ? 'Update the review information.'
                            : 'Add a new user review.'
                        }
                    </p>


                    {/* Conditional Component */}
                    {editingReview ? (
                        <EditReviews editingReview={editingReview}  closeModal={() => modalRef.current.close()} refetch={refetch}/>
                    ) : (
                        <CreateReviews  closeModal={() => modalRef.current.close()} refetch={refetch}/>
                    )}


                    {/* Close */}
                    <div className="modal-action">

                        <form method="dialog">
                            <button
                                className="btn"
                                onClick={() => setEditingReview(null)}
                                refetch={refetch}
                            >
                                Close
                            </button>
                        </form>

                    </div>

                </div>


                {/* Click outside to close */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>

            </dialog>

        </div>
    );
};

export default UserReviews;

