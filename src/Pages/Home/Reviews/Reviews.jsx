import ReviewsCard from "./ReviewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import './Reviews.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  // console.log(reviews);
  const {data: reviews = [], isLoading} = useQuery({
    queryKey:['reviews'],
    queryFn: async()=>{
      const res = await axiosSecure.get('/reviews');
      return res.data
    }
  })
  return (
    <section className="zip-reviews-section">
      <div className="zip-reviews-heading">
        <div>
          <p className="zip-feature-eyebrow">Good experiences travel</p>
          <h2>What our customers are saying.</h2>
          <p>Real feedback from people who trust us with every delivery.</p>
        </div>
        <div className="zip-review-controls" aria-label="Review controls">
          <button className="review-prev" type="button" aria-label="Previous review" disabled={reviews.length < 2}>
            <ArrowLeft size={18} />
          </button>
          <button className="review-next" type="button" aria-label="Next review" disabled={reviews.length < 2}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="zip-reviews-slider" role="region" aria-roledescription="carousel" aria-label="Customer reviews">
        {reviews.length > 0 ? (
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                prevEl: ".review-prev",
                nextEl: ".review-next",
                }}
                pagination={{ clickable: true }}
                rewind
                watchOverflow
                slidesPerView={1}
                spaceBetween={14}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 18 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                }}
                className="testimonialSwiper"
            >
                {reviews.map((review) => (
                <SwiperSlide key={review.id || `${review.name}-${review.rating}`}>
                    <ReviewsCard review={review} />
                </SwiperSlide>
                ))}
            </Swiper>
        ) : (
          <div className="zip-reviews-empty" role="status">
            {isLoading ? "Loading customer reviews..." : "Customer reviews will appear here soon."}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
