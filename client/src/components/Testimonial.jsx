import React from "react";
import Title from "./Title";
import { assets } from "../assets/data";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <section className="max-padd-container py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Title
          title1={"What People Says?"}
          title2={"Don't just take our words"}
          titleStyles={"mb-10"}
          paragraph={
            "Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."
          }
        />
      </motion.div>
      {/* Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          className="bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.0 }}
        >
          <div className="flex-between">
            <div className="flex gap-1">
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
            </div>
            <p>18 Aug 2025</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            perferendis vitae et cumque autem eveniet.
          </p>
          <div className="flex items-center gap-2">
            <img src={assets.user1} alt="user" className="size-8 rounded-full" />
            <p>Donald Jackman</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-primary-one w-full space-y-4 p-3 rounded-md text-gray-500 text-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="flex-between">
            <div className="flex gap-1">
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
            </div>
            <p>18 Aug 2025</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            perferendis vitae et cumque autem eveniet.
          </p>
          <div className="flex items-center gap-2">
            <img src={assets.user2} alt="user" className="size-8 rounded-full" />
            <p>John Doe</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-primary-two w-full space-y-4 p-3 rounded-md text-gray-500 text-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex-between">
            <div className="flex gap-1">
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
              <img src={assets.star} alt="star" width={16} />
            </div>
            <p>18 Aug 2025</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            perferendis vitae et cumque autem eveniet.
          </p>
          <div className="flex items-center gap-2">
            <img src={assets.user3} alt="user" className="size-8 rounded-full" />
            <p>Jane Doe</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
