import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { assets } from "../assets/data";

const About = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28 !pt-28">
      {/* Container */}
      <div className="flex items-center flex-col lg:flex-row gap-12">
        {/* Info - Left Side */}
        <div className="flex-[5]">
          <Title
            title1={"Your trusted real estate partner"}
            title2={"Helping you every step of the way"}
            paragraphStyles={"hidden"}
          />
          <p className="mb-10 mt-5">
            Find reliable car with transparent pricing, verified inspections,
            flexible pickup and delivery options, and 24/7 customer support for
            a smooth rental or buying experience.
          </p>
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            <motion.div
              className="p-4 rounded-xl bg-primary"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h5>Wide Vehicle Selection</h5>
              <p className="text-sm mt-2">
                Book in seconds with instant confirmations and flexible pickup
                options, so you get on the road fast without waiting or hassles.
              </p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-primary-one"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h5>Quick Service</h5>
              <p className="text-sm mt-2">
                Choose from economy to luxury models, regularly maintained and
                verified, giving you reliable performance and the perfect car
                for every trip.
              </p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-primary-two"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h5>Transparent Pricing</h5>
              <p className="text-sm mt-2">
                Upfront rates with no hidden fees, clear breakdowns for
                insurance and extras, so pricing stays predictable and easy to
                understand before booking.
              </p>
            </motion.div>
            <motion.div
              className="p-4 rounded-xl bg-primary"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h5>24/7 Support</h5>
              <p className="text-sm mt-2">
                Around the clock customer support via chat and phone, resolving
                issues quickly and helping with changes, extensions, or roadside
                assistance anytime you need.
              </p>
            </motion.div>
          </motion.div>
        </div>
        {/* Image - Right Side */}
        <div className="flex-[4] flex gap-7">
          <motion.div
            className="relative flex justify-end mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={assets.about1} alt="about-image" className="rounded-2xl" />
          </motion.div>
          <motion.div
            className="relative flex justify-end mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img src={assets.about2} alt="about-image" className="rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
