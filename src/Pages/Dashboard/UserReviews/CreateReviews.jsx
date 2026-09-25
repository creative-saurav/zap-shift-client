import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";

const CreateReviews = ({closeModal , refetch}) => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();


const handleReviews = data => {
    const imageFile = data.photo[0];
    console.log("image file",imageFile);
    // Store Image
    const formData = new FormData();
    formData.append("image", imageFile);
    // Upload image to ImageBB
    const imageAPIUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
    axios.post(imageAPIUrl, formData)
        .then(res => {
            // ImageBB image URL
            const imageUrl = res.data.data.url;
            // Backend Data
            const reviewData = {
                name: data.name,
                review: data.review,
                rating: Number(data.rating),
                image: imageUrl
            };
            // Send complete data to backend
             axiosSecure.post('/reviews', reviewData)
             .then((res)=>{
                if (res.data.insertedId) {
                    toast.success('Review created successfully.');
                    closeModal();
                    refetch();
                    reset();
                }
             })
        })
        .catch(() => {
            toast.error('Review create failed.');
        });
};


  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(handleReviews)}>
        <div>
          <label className="label font-medium">User Name</label>

          <input
            type="text"
            placeholder="Enter user name"
            {...register("name")}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-medium">User Image</label>

          <input
            type="file"
            placeholder="Enter user image"
            {...register('photo', { required: true })}
            className="file-input input-bordered w-full"
          />
        </div>


        <div>
          <label className="label font-medium">Review</label>

          <textarea
            placeholder="Write review..."
            {...register("review")}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
        </div>

        <div>
          <label className="label font-medium">Rating</label>

          <select defaultValue="5" className="select select-bordered w-full" {...register("rating")}>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn w-full bg-[#CAEB66] hover:bg-[#b9dc55] border-none text-[#03373D]"
        >
          Create Review
        </button>
      </form>
    </div>
  );
};

export default CreateReviews;
