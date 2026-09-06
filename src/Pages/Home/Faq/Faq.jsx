import React from "react";

const faqs = [
  {
    id: 1,
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    id: 2,
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes. It is designed to fit most body types and can be adjusted for a comfortable fit.",
  },
  {
    id: 3,
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Regular use may improve posture and reduce discomfort when combined with healthy habits.",
  },
  {
    id: 4,
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some models include smart vibration reminders to encourage better posture.",
  },
  {
    id: 5,
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You'll receive an email notification once the product becomes available.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-[#03373D]">
            Frequently Asked Question (FAQ)
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg leading-8 text-[#606060]">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow rounded-3xl border border-gray-200 bg-white
                 transition-all duration-300
                 has-[:checked]:bg-[#EAF8FB]
                 has-[:checked]:border-[#3EA7BE]"
            >
              <input type="radio" name="faq" />

              <div className="collapse-title text-xl font-bold text-[#03373D]">
                {faq.question}
              </div>

              <div className="collapse-content border-t border-[#CFE6EB]">
                <p className="pt-5 text-[#606060] leading-8">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-14">
          <div className="flex items-center">
            <button className="bg-primary text-secondary rounded-full px-10 py-4 text-xl font-bold hover:bg-[#bfe54d] transition">
              See More FAQ's
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
