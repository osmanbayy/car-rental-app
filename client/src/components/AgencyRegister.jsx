import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, cities } from "../assets/data";
import toast from "react-hot-toast";

const AgencyRegister = () => {
  const { setShowAgencyRegister, axios, getToken, setIsOwner } =
    useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "/api/agencies",
        { name, email, address, contact, city },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowAgencyRegister(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div
      onClick={() => setShowAgencyRegister(false)}
      className="fixed inset-0 left-0 top-0 bottom-0 z-50 flex items-center justify-center bg-black/80"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex-center bg-white rounded-xl max-w-4xl max-md:mx-2 text-sm relative"
      >
        {/* Image - Left Side */}
        <img
          src={assets.agencyReg}
          alt="register image"
          className="w-1/2 rounded-l-xl hidden md:block"
        />
        {/* Content - Right Side */}
        <div className="flex flex-col md:w-1/2 p-8 md:p-10">
          <img
            src={assets.close}
            alt="close"
            onClick={() => setShowAgencyRegister(false)}
            className="absolute top-4 right-4 size-6 p-1 cursor-pointer bg-solid/50 rounded-full shadow-md"
          />
          <h3 className="mb-6">Register as Agency</h3>
          <div className="flex gap-2 xl:gap-3">
            <div className="w-full mt-2">
              <label htmlFor="name">Agency Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                type="text"
                placeholder="Type Here..."
                className="border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
                required
              />
            </div>
            <div className="w-full mt-2">
              <label htmlFor="contact">Contact</label>
              <input
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                type="text"
                id="contact"
                placeholder="Type Here..."
                className="border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
                required
              />
            </div>
          </div>
          <div className="w-full mt-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Type Here..."
              className="border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
              required
            />
          </div>
          <div className="w-full mt-2">
            <label htmlFor="address">Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              id="address"
              placeholder="Type Here..."
              className="border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
              required
            />
          </div>
          <div className="w-full max-w-60 mt-2 mr-auto">
            <label htmlFor="city">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id="city"
              className="border border-slate-900/10 bg-primary rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-solid py-2 rounded-lg w-60 mt-4">
            Register as Agency
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgencyRegister;
