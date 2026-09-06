import React from "react";

import wave from "../../../assets/safe.png";
import merchant from "../../../assets/location-merchant.png";

const MerchantSection = () => {
  return (
    <section className="my-20">
      <div className="relative overflow-hidden rounded-[32px] bg-[#07353D] min-h-[360px]">

        {/* Background Wave */}
        <img
          src={wave}
          alt=""
          className="absolute top-0 left-0 w-full h-40 object-cover"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between h-full px-8 md:px-14 py-10 lg:py-12">

          {/* Left Content */}
          <div className="w-full lg:w-[48%] text-center lg:text-left mt-10 lg:mt-0">

            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-[520px]">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>

            <p className="mt-6 text-gray-300 leading-8 max-w-[470px]">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-10">

              <button className="bg-primary text-secondary font-semibold rounded-full px-8 py-4 hover:scale-105 transition">
                Become a Merchant
              </button>

              <button className="border border-primary text-primary rounded-full px-8 py-4 font-semibold hover:bg-primary hover:text-secondary transition">
                Earn with ZapShift Courier
              </button>

            </div>

          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[52%] flex justify-center lg:justify-end items-end">

            <img
              src={merchant}
              alt="Merchant"
              className="w-[300px] sm:w-[360px] md:w-[420px] lg:w-[520px] xl:w-[560px] object-contain"
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default MerchantSection;