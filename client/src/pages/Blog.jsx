import React from "react";
import { motion } from "framer-motion";
import { blogs } from "../assets/data";

const Blog = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        mass: 0.8
      }
    }
  };

  return (
    <div className="bg-primary py-16 pt-28">
      <div className="max-padd-container">
        {/* Container */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {blogs.map((blog, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={itemVariants}
            >
              {/* Image */}
              <div className="bg-white p-4 rounded-2xl">
                <img src={blog.image} alt={blog.title} className="shadow-xl shadow-slate-900/20 rounded-xl" />
              </div>
              {/* Info */}
              <p className="text-sm font-semibold mt-6">{blog.category}</p>
              <h5 className="pr-4 mb-1 line-clamp-2">{blog.title}</h5>
              <p>{blog.description}</p>
              <button className="underline mt-2 text-sm line-clamp-2">Continue Reading...</button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
