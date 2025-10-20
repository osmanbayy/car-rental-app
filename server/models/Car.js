import mongoose from "mongoose";

const carSchema = mongoose.Schema({
    agency: { type: String, ref: "Agency", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    odometer: { type: Number, required: true },
    bodyType: { type: String, required: true },
    price: {
        rent: { type: String },
        sale: { type: String },
    },
    specs: {
        transmission: { type: String, required: true },
        fuelType: { type: String, required: true },
        seats: { type: Number, required: true },
    },
    features: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const Car = mongoose.model("Car", carSchema);
export default Car;