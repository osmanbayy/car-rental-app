import React from "react";
import { assets } from "../assets/data"

const Contact = () => {
  return (
    <div className="bg-primary py-10 pt-28">
      <form className="flex flex-col items-center text-sm text-slate-800">
        <p className="text-xs bg-black/80 text-white font-medium px-3 py-1 rounded-full">
          Contact Us
        </p>
        <h1 className="text-4xl font-bold py-4 text-center">
          Let’s Get In Touch.
        </h1>
        <p className="max-md:text-sm text-gray-500 pb-10 text-center">
          Or just reach out manually to us at{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            contact@rentigo.com
          </a>
        </p>

        <div className="max-w-96 w-full px-4">
          <label htmlFor="name" className="font-medium">
            Full Name
          </label>
          <div className="bg-white flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <img src={assets.user} alt="user icon" width={19} className="invert-50" />
            <input
              type="text"
              className="h-full px-2 w-full outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          <label htmlFor="email-address" className="font-medium mt-4">
            Email Address
          </label>
          <div className="bg-white flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <img src={assets.mail} alt="mail icon" width={18} />
            <input
              type="email"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          <label htmlFor="message" className="font-medium mt-4">
            Message
          </label>
          <textarea
            rows="4"
            className="w-full mt-2 p-2 border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all bg-white"
            placeholder="Enter your message"
            required
          ></textarea>

          <button
            type="submit"
            className="flex-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition cursor-pointer"
          >
            Submit Form
            <img src={assets.right} alt="right arrow" className="invert" width={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
