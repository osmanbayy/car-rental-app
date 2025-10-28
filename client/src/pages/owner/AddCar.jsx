import React, { useState } from "react";
import { bodyType, fuelTypes, transmission } from "../../lib/carFilterOptions";
import { assets } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, getToken } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    address: "",
    odometer: "",
    bodyType: "",
    priceRent: "",
    priceSale: "",
    transmission: "",
    seats: "",
    fuelType: "",
    features: {
      "Rear Camera": false,
      "Apple CarPlay": false,
      "Keyless Entry": false,
      "Adaptive Cruise": false,
      "Heated Seats": false,
      Sunroof: false,
      "Parking Assist": false,
      "Cruise Control": false,
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Check if all inputs are filled
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.city ||
      !inputs.country ||
      !inputs.address ||
      !inputs.odometer ||
      !inputs.bodyType ||
      (!inputs.priceRent && !inputs.priceSale) ||
      !inputs.transmission ||
      !inputs.seats ||
      !inputs.fuelType
    ) {
      toast.error("Please fill all the fields.");
      return;
    }
    // Check if at least one image is uploaded
    const hasImage = Object.values(images).some((img) => img !== null);
    if (!hasImage) {
      toast.error("Please upload at least one image of the car.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("city", inputs.city);
      formData.append("country", inputs.country);
      formData.append("address", inputs.address);
      formData.append("odometer", inputs.odometer);
      formData.append("bodyType", inputs.bodyType);
      formData.append(
        "priceRent",
        inputs.priceRent ? Number(inputs.priceRent) : ""
      );
      formData.append(
        "priceSale",
        inputs.priceSale ? Number(inputs.priceSale) : ""
      );
      formData.append("transmission", inputs.transmission);
      formData.append("seats", inputs.seats);
      formData.append("fuelType", inputs.fuelType);

      const features = Object.keys(inputs.features).filter(
        (feature) => inputs.features[feature]
      );
      formData.append("features", JSON.stringify(features));

      Object.keys(images).forEach((img) => {
        images[img] && formData.append("images", images[img]);
      });

      const { data } = await axios.post("/api/cars", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        // Reset form
        setInputs({
          title: "",
          description: "",
          city: "",
          country: "",
          address: "",
          odometer: "",
          bodyType: "",
          priceRent: "",
          priceSale: "",
          transmission: "",
          seats: "",
          fuelType: "",
          features: {
            "Rear Camera": false,
            "Apple CarPlay": false,
            "Keyless Entry": false,
            "Adaptive Cruise": false,
            "Heated Seats": false,
            Sunroof: false,
            "Parking Assist": false,
            "Cruise Control": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3 px-2 text-sm font-medium xl:max-w-3xl"
      >
        <div className="w-full">
          <h5>Car Name</h5>
          <input
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            value={inputs.title}
            type="text"
            placeholder="Type Here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
          />
        </div>
        <div className="w-full">
          <h5>Car Description</h5>
          <textarea
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
            value={inputs.description}
            rows={5}
            placeholder="Type Here..."
            className="resize-none px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <h5>City</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
              value={inputs.city}
              type="text"
              placeholder="Type Here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            />
          </div>
          <div className="w-full">
            <h5>Country</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, country: e.target.value })
              }
              value={inputs.country}
              type="text"
              placeholder="Type Here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            />
          </div>
          <div>
            <h5>Car Type</h5>
            <select
              onChange={(e) =>
                setInputs({ ...inputs, bodyType: e.target.value })
              }
              value={inputs.bodyType}
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-36 outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            >
              <option>Select Type</option>
              {bodyType.map((bodyType) => (
                <option value={bodyType}>{bodyType}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex-[1]">
            <h5>Address</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, address: e.target.value })
              }
              value={inputs.address}
              type="text"
              placeholder="Type Here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            />
          </div>
          <div className="w-34">
            <h5>Odometer</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, odometer: e.target.value })
              }
              value={inputs.odometer}
              type="number"
              placeholder="e.g. 12.500 (km)"
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <h5>
              Rent Price <span className="text-xs">/day</span>
            </h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, priceRent: e.target.value })
              }
              value={inputs.priceRent}
              type="number"
              placeholder="0"
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-28 outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
          <div>
            <h5>Sale Price</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, priceSale: e.target.value })
              }
              value={inputs.priceSale}
              type="number"
              placeholder="0"
              className="w-28 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
          <div>
            <h5>Transmission</h5>
            <select
              onChange={(e) =>
                setInputs({ ...inputs, transmission: e.target.value })
              }
              value={inputs.transmission}
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            >
              <option>Select Type</option>
              {transmission.map((transmission) => (
                <option value={transmission}>{transmission}</option>
              ))}
            </select>
          </div>
          <div>
            <h5>Seats</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, seats: e.target.value })}
              value={inputs.seats}
              type="number"
              placeholder="0"
              className="w-20 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
          <div className="w-34">
            <h5>Fuel Type</h5>
            <select
              onChange={(e) =>
                setInputs({ ...inputs, fuelType: e.target.value })
              }
              value={inputs.fuelType}
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            >
              <option>Select Type</option>
              {fuelTypes.map((fuelType) => (
                <option value={fuelType}>{fuelType}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Features */}
        <div className="">
          <h5>Features</h5>
          <div className="flex gap-3 flex-wrap mt-1">
            {Object.keys(inputs.features).map((feature, index) => (
              <div key={index} className="flex gap-1">
                <input
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      features: {
                        ...inputs.features,
                        [feature]: e.target.checked,
                      },
                    })
                  }
                  id={`feature[${index + 1}]`}
                  type="checkbox"
                  checked={inputs.features[feature]}
                />
                <label htmlFor={`feature[${index + 1}]`}>{feature}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Images */}
        <div className="flex gap-2 mt-2">
          {Object.keys(images).map((key) => (
            <label
              htmlFor={`carImage[${key + 1}]`}
              key={key}
              className="cursor-pointer ring-1 ring-slate-900/10 rounded-md"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
                id={`carImage[${key + 1}]`}
                hidden
              />
              <div className="size-24 bg-primary flex-center ">
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadIcon
                  }
                  alt="upload area"
                  className="overflow-hidden object-contain size-24"
                />
              </div>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="btn-solid mt-3 max-w-36"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
