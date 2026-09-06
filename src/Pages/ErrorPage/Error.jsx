import React from "react";
import { Link } from "react-router";
import error from "../../assets/error.png";

const Error = () => {
  return (
    <section className="min-h-screen bg-[#F3F5F7] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-[28px] py-12 flex flex-col items-center">
        {/* Error Image */}
        <img
          src={error}
          alt="Error 404"
          className="w-40 md:w-48 object-contain"
        />

        {/* Button */}
        <Link
          to="/"
          className="mt-8 px-6 py-2 bg-primary text-black font-medium rounded-lg hover:bg-secondary hover:text-white transition"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default Error;