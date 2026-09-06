import React from "react";
import { TbPackageExport, TbTruckDelivery, TbWorld } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const services = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    icon: <TbTruckDelivery className="text-5xl text-[#0B3C43]" />,
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    active: false,
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    icon: <TbWorld className="text-5xl text-[#0B3C43]" />,
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    active: true,
  },
  {
    id: 3,
    title: "Fulfillment Solution",
     icon: <BsBoxSeam className="text-5xl text-[#0B3C43]" />,
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    active: false,
  },
  {
    id: 4,
    title: "Cash on Home Delivery",
     icon: <MdOutlinePayments className="text-5xl text-[#0B3C43]" />,
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    active: false,
  },
  {
    id: 5,
    title: "Corporate Service / Contract In Logistics",
     icon: <HiOutlineBuildingOffice2 className="text-5xl text-[#0B3C43]" />,
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    active: false,
  },
  {
    id: 6,
    title: "Parcel Return",
     icon: <TbPackageExport className="text-5xl text-[#0B3C43]" />,
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    active: false,
  },
];

const Services = () => {
  return (
    <section className="py-16">
      <div className="bg-[#083C43] rounded-[32px] px-6 md:px-12 py-14">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-white text-4xl font-bold mb-4">
            Our Services
          </h2>

          <p className="text-white leading-7">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-1 hover:bg-primary
                ${
                  service.active
                    ? "bg-primary"
                    : "bg-white"
                }`}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full text-gray-500  flex items-center justify-center">
                 {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-7">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;