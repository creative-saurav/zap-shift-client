import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FiArrowUpRight } from "react-icons/fi";
import "./banner.css";

import bannerImage1 from "../../../assets/banner/banner1.png";
import bannerImage2 from "../../../assets/banner/banner2.png";
import bannerImage3 from "../../../assets/banner/banner3.png";

const slides = [
  {
    id: 1,
    image: bannerImage1,
    title1: "We Make Sure Your",
    highlight: "Parcel Arrives",
    title2: "On Time",
    title3: "– No Fuss.",
    description:
      "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments—we deliver on time, every time.",
  },
  {
    id: 2,
    image: bannerImage2,
    title1: "Fast & Reliable",
    highlight: "Delivery",
    title2: "Across Bangladesh",
    title3: "",
    description:
      "Ship parcels anywhere in Bangladesh with real-time tracking and quick delivery service.",
  },
  {
    id: 3,
    image: bannerImage3,
    title1: "Delivery in",
    highlight: "30 Minutes ",
    title2: "at your doorstep",
    title3: "",
    description:
      "We ensure every parcel reaches its destination safely with our trusted delivery network.",
  },
];

const Banner = () => {
  return (
    <div className="mt-8">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        swipeable
      >
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-[30px] px-8 lg:px-16 py-12">
            <div className="grid lg:grid-cols-2 items-center gap-10">

              {/* Left Side */}
              <div className="text-left">

                <h1 className="text-5xl font-bold leading-tight text-[#12343b]">
                    {slide.title1}
                    <br />
                    <span className="text-[#3E97A8]">{slide.highlight}</span>{" "}
                    {slide.title2}
                    <br />
                    {slide.title3}
                    </h1>

                    <p className="text-gray-500 mt-6 max-w-lg leading-8">
                    {slide.description}
                    </p>

                <div className="flex gap-4 mt-8">
                  <button className="bg-primary rounded-full px-7 py-3 font-semibold flex items-center gap-3 hover:bg-secondary hover:text-white transition">
                    Track Your Parcel

                    <span className="bg-black w-8 h-8 rounded-full flex justify-center items-center text-lime-300">
                      <FiArrowUpRight />
                    </span>
                  </button>

                  <button className="border px-7 py-3 rounded-full font-semibold hover:bg-gray-100">
                    Be A Rider
                  </button>
                </div>

              </div>

              {/* Right Side */}
              <div>
                <img
                  src={slide.image}
                  alt=""
                  className="w-full max-w-lg mx-auto"
                />
              </div>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;