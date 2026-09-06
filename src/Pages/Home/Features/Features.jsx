import React from "react";

import tracking from "../../../assets/live-tracking.png";
import delivery from "../../../assets/safe-delivery.png";
import support from "../../../assets/safe-delivery.png";

const features = [
  {
    id: 1,
    image: tracking,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    image: delivery,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    image: support,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Features = () => {
  return (
    <section className="py-16">
      <div className="space-y-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-[30px] p-6 md:p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Image */}
              <div className="flex justify-center md:w-[180px] shrink-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-40 md:w-44"
                />
              </div>

              {/* Dashed Divider */}
              <div className="hidden md:block h-28 border-l border-dashed border-[#7BA5AF]"></div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-black mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-8">
                  {feature.description}
                </p>
              </div>

            </div>
          </div>
        ))}

        {/* Bottom Dashed Line */}
        <div className="border-b border-dashed border-[#7BA5AF] pt-8"></div>
      </div>
    </section>
  );
};

export default Features;