
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const EditReviews = ({ editingReview, closeModal, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const handleUpdateReview = (data) => {

        const imageFile = data.photo?.[0];
        if (!imageFile) {
            const updatedReview = {
                name: data.name,
                review: data.review,
                rating: Number(data.rating),
                image: editingReview.image
            };

            axiosSecure
                .patch(`/reviews/${editingReview._id}`, updatedReview)
                .then((res) => {

                    if (res.data.modifiedCount > 0) {
                        toast.success('Review updated successfully.');
                        refetch();
                        reset();
                        closeModal();
                    }

                })
                .catch(() => {
                    toast.error('Review update failed.');
                });

            return;
        }

        // New image Add ImageBB to  upload
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageAPIUrl =
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

        axios
            .post(imageAPIUrl, formData)
            .then((res) => {

                const imageUrl = res.data.data.url;

                const updatedReview = {
                    name: data.name,
                    review: data.review,
                    rating: Number(data.rating),
                    image: imageUrl
                };

                 axiosSecure.patch(`/reviews/${editingReview._id}`, updatedReview )
                 .then((res)=>{
                    if (res.data.modifiedCount > 0) {
                        toast.success('Review updated successfully.');

                        refetch();
                        reset();
                        closeModal();
                    }
                 })

            })
            .catch(() => {
                toast.error('Review update failed.');
            });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(handleUpdateReview)}
                className="space-y-4"
            >
                {/* Name */}
                <div>
                    <label className="label font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        defaultValue={editingReview.name}
                        {...register('name', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>


                {/* Review */}
                <div>
                    <label className="label font-medium">
                        Review
                    </label>

                    <textarea
                        defaultValue={editingReview.review}
                        {...register('review', { required: true })}
                        className="textarea textarea-bordered w-full"
                        rows="4"
                    />
                </div>


                {/* Rating */}
                <div>
                    <label className="label font-medium">
                        Rating
                    </label>

                    <select
                        {...register('rating', { required: true })}
                        defaultValue={editingReview.rating}
                        className="select select-bordered w-full"
                    >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>


                {/* Current Image */}
                <div>
                    <label className="label font-medium">
                        Current Image
                    </label>

                    {editingReview.image && (
                        <img
                            src={editingReview.image}
                            alt={editingReview.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#CAEB66]"
                        />
                    )}
                </div>


                {/* New Image */}
                <div>
                    <label className="label font-medium">
                        Change Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register('photo')}
                        defaultValue={editingReview.photo}
                        className="file-input file-input-bordered w-full"
                    />
                </div>


                {/* Update Button */}
                <button
                    type="submit"
                    className="btn w-full bg-[#CAEB66] hover:bg-[#b9dc55] border-none text-[#03373D]"
                >
                    Update Review
                </button>

            </form>
        </div>
    );
};

export default EditReviews;

