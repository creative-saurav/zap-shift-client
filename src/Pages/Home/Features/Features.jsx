import React from "react";

import tracking from "../../../assets/live-tracking.png";
import delivery from "../../../assets/safe-delivery.png";
import support from "../../../assets/customer-top.png";

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
    <section className="zip-feature-section">
      <div className="zip-feature-heading">
        <p className="zip-feature-eyebrow">What matters on every route</p>
        <h2>Delivery, made easier to trust.</h2>
      </div>
      <div className="zip-feature-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`zip-feature-card zip-feature-card-${feature.id}`}
          >
            <div className={`zip-feature-visual zip-feature-visual-${feature.id}`}>
                <img
                  src={feature.image}
                  alt={feature.title}
                />
            </div>
            <div className="zip-feature-copy">
              <span className="zip-feature-number">0{feature.id}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;