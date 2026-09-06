import React, { use } from "react";
import customerTop from "../../../assets/customer-top.png";
import ReviewsCard from "./ReviewsCard";


import { Autoplay, EffectCoverflow } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import './Reviews.css'

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  // console.log(reviews);
  return (
    <section className="pt-20 pb-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Top Image */}
        <img
          src={customerTop}
          alt="Customer"
          className="w-40 md:w-48 mx-auto"
        />

        {/* Heading */}
        <h2 className="mt-8 text-[32px] md:text-[44px] font-bold text-[#03373D] leading-tight">
          What our customers are sayings
        </h2>

        {/* Description */}
        <p className="mt-5 mb-3 max-w-2xl mx-auto text-[#606060] text-base leading-8">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* <ReviewsCard reviews={reviews}></ReviewsCard> */}
      <div className="relative">

            <button className="review-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <FaArrowLeft className="text-black" />
            </button>

            <button className="review-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <FaArrowRight className="text-black" />
            </button>

            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                prevEl: ".review-prev",
                nextEl: ".review-next",
                }}
                pagination={{ clickable: true }}
                centeredSlides
                loop
                slidesPerView={3}
                spaceBetween={35}
                className="testimonialSwiper"
            >
                {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                    <ReviewsCard review={review} />
                </SwiperSlide>
                ))}
            </Swiper>

            </div>
    </section>
  );
};

export default Reviews;
