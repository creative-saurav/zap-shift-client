import React from "react";
import './AboutUs.css'

const AboutUs = () => {
  return (
    <section className=" py-8">
      <div className="shadow bg-white rounded-[30px] p-10 md:p-16">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-black">About Us</h2>

        <p className="mt-4 max-w-3xl text-gray-500 text-base leading-7">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-border">

          {/* Story */}
          <input
            type="radio"
            name="about_tabs"
            role="tab"
            className="tab text-xl font-medium"
            aria-label="Story"
            defaultChecked
          />

          <div role="tabpanel" className="tab-content pt-8">
            <div className="space-y-6 text-gray-600 leading-9 text-base">
              <p>
                We started with a simple promise — to make parcel delivery fast,
                reliable, and stress-free. Over the years, our commitment to
                real-time tracking, efficient logistics, and customer-first
                service has made us a trusted partner for thousands. Whether
                it's a personal gift or a time-sensitive business delivery, we
                ensure it reaches its destination — on time, every time.
              </p>

              <p>
                We started with a simple promise — to make parcel delivery fast,
                reliable, and stress-free. Over the years, our commitment to
                real-time tracking, efficient logistics, and customer-first
                service has made us a trusted partner for thousands. Whether
                it's a personal gift or a time-sensitive business delivery, we
                ensure it reaches its destination — on time, every time.
              </p>

              <p>
                We started with a simple promise — to make parcel delivery fast,
                reliable, and stress-free. Over the years, our commitment to
                real-time tracking, efficient logistics, and customer-first
                service has made us a trusted partner for thousands. Whether
                it's a personal gift or a time-sensitive business delivery, we
                ensure it reaches its destination — on time, every time.
              </p>
            </div>
          </div>

          {/* Mission */}
          <input
            type="radio"
            name="about_tabs"
            role="tab"
            className="tab text-xl font-medium"
            aria-label="Mission"
          />

          <div role="tabpanel" className="tab-content pt-8">
            <div className="space-y-6 text-gray-600 leading-9 text-base">
              <p>
                Our mission is to provide secure, affordable, and lightning-fast
                delivery services across Bangladesh. We focus on innovation,
                transparency, and customer satisfaction in every shipment.
              </p>
            </div>
          </div>

          {/* Success */}
          <input
            type="radio"
            name="about_tabs"
            role="tab"
            className="tab text-xl font-medium"
            aria-label="Success"
          />

          <div role="tabpanel" className="tab-content pt-8">
            <div className="space-y-6 text-gray-600 leading-9 text-base">
              <p>
                Thousands of successful deliveries, trusted business partners,
                and satisfied customers have helped us become one of the most
                dependable courier services in the country.
              </p>
            </div>
          </div>

          {/* Team & Others */}
          <input
            type="radio"
            name="about_tabs"
            role="tab"
            className="tab text-xl font-medium"
            aria-label="Team & Others"
          />

          <div role="tabpanel" className="tab-content pt-8">
            <div className="space-y-6 text-gray-600 leading-9 text-base">
              <p>
                Behind every successful delivery is our dedicated team of
                logistics experts, riders, support staff, and technology
                specialists working together to provide the best experience.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;