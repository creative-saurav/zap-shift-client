import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";

import casio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import star from "../../../assets/brands/star.png";
import startpeople from "../../../assets/brands/start_people.png";
import randstad from "../../../assets/brands/randstad.png";
import casio2  from  "../../../assets/brands/moonstar.png";

const brands = [
  casio,
  amazon,
  moonstar,
  star,
  startpeople,
  randstad,
  casio2,
];

const Brands = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-black mb-12">
          We've helped thousands of sales teams
        </h2>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          spaceBetween={40}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-16">
                <img
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-14 border-t border-dashed border-gray-300"></div>
      </div>
    </section>
  );
};

export default Brands;
