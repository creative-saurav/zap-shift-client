import React from "react";
import { FiMapPin } from "react-icons/fi";
import { TbBuildingStore, TbBuildingWarehouse, TbCash, TbTruckDelivery } from "react-icons/tb";

const works = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    icon: <TbTruckDelivery className="text-4xl text-black" />,
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    title: "Cash On Delivery",
    icon: <TbCash className="text-4xl text-black" />,
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 3,
    title: "Delivery Hub",
     icon: <TbBuildingWarehouse className="text-4xl text-black" />,
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    icon: <TbBuildingStore className="text-4xl text-black" />,
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const ItWorks = () => {
  return (
    <section className="py-16">
      <div className="px-4">
        <h2 className="text-3xl font-bold text-black mb-8">
          How it Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {works.map((item) => (
            <div
              key={item.id}
              className="shadow bg-white rounded-3xl p-7 hover:shadow-lg transition duration-300"
            >
              {/* Icon */}
              <div className="relative w-fit mb-5">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-7 text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ItWorks;