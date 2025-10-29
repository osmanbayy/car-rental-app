import React from "react";
import { assets } from "../assets/data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="max-padd-container py-16 pt-10">
      <div className="bg-[#889ef6] max-padd-container rounded-3xl xl:max-h-72">
        {/* Container */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <motion.div
            className="flex-[5] relative lg:bottom-12 xl:bottom-20 select-none pointer-events-none"
            initial={{ opacity: 0, y: -74 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={assets.banner} alt="banner image" />
          </motion.div>
          {/* Right Side */}
          <motion.div
            className="flex-[4] text-white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.05 }}
          >
            <div className="flex flex-col gap-4 p-4">
              <h3 className="capitalize xl:pt-6">
                Buy With Confidence, Rent Without Worry
              </h3>
              <p className="text-white/70">
                Find your next ride or earn from your vehicle in minutes. We
                handle insurance, driver verification and secure payments.
              </p>
              <button
                onClick={() => navigate("/listing")}
                className="btn-white w-36"
              >
                Explore Cars
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
