import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FiArrowUpRight } from "react-icons/fi";
import { PackageCheck, Sparkles } from "lucide-react";
import "./Banner.css";

const slides = [
  {
    id: 1,
    title1: "We Make Sure Your",
    highlight: "Parcel Arrives",
    title2: "On Time",
    title3: "",
    description:
      "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments—we deliver on time, every time.",
  },
  {
    id: 2,
    title1: "Fast & Reliable",
    highlight: "Delivery",
    title2: "Across Bangladesh",
    title3: "",
    description:
      "Ship parcels anywhere in Bangladesh with real-time tracking and quick delivery service.",
  },
  {
    id: 3,
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
    <div className="zip-home-hero">
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
          <div key={slide.id} className="zip-hero-panel">
            <div className="zip-hero-grid">
              <div className="zip-hero-copy">
                <p className="zip-hero-eyebrow">Careful delivery, clearly tracked</p>
                <h1>
                    {slide.title1}
                    <br />
                    <span>{slide.highlight}</span>{" "}
                    {slide.title2}
                    <br />
                    {slide.title3}
                    </h1>

                    <p className="zip-hero-description">
                    {slide.description}
                    </p>

                <div className="zip-hero-actions ">
                  <button className="zip-primary-button">
                    Track Your Parcel
                    <span className="zip-button-icon">
                      <FiArrowUpRight />
                    </span>
                  </button>

                  <button className="zip-secondary-button">
                    Be A Rider
                  </button>
                </div>
              </div>
              <div className="zip-parcel-scene" role="img" aria-label="A carefully packed parcel ready for delivery">
                <div className="zip-scene-caption"><span>ON ITS WAY</span><span>0{slide.id} / 03</span></div>
                <div className="zip-scene-sun" />
                <div className="zip-parcel-box">
                  <div className="zip-parcel-top" />
                  <div className="zip-parcel-front"><span className="zip-parcel-tape" /><span className="zip-parcel-stamp">Z<br />S</span></div>
                  <div className="zip-parcel-side" />
                </div>
                <div className="zip-scene-ground" />
                <div className="zip-scene-note"><PackageCheck size={18} /><span><strong>Handled with care</strong><small>All the way to your door</small></span></div>
                <Sparkles className="zip-scene-sparkle zip-sparkle-one" size={19} aria-hidden="true" />
                <Sparkles className="zip-scene-sparkle zip-sparkle-two" size={13} aria-hidden="true" />
                <div className="zip-scene-index"><span>0{slide.id}</span><span>MADE TO MOVE WITH YOU</span></div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;