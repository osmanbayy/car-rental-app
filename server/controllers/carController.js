import { v2 as cloudinary } from 'cloudinary';
import Car from '../models/Car.js';
import Agency from '../models/Agency.js';

// Create a new car
export const addNewCar = async (request, response) => {
    try {
        const { title, description, city, country, address, odometer, bodyType, priceRent, priceSale, transmission, seats, fuelType, features } = request.body;

        const agency = await Agency.findOne({ owner: request.auth().userId });
        if (!agency) {
            return response.json({ success: false, message: "Agency not found." });
        }

        // Upload images to Cloudinary
        const uploadImages = request.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });

        // Waiting for uploads to complete
        const images = await Promise.all(uploadImages);

        await Car.create({
            agency: agency._id,
            title,
            description,
            city,
            country,
            address,
            odometer,
            bodyType,
            price: {
                rent: priceRent ? + priceRent : null,
                sale: priceSale ? + priceSale : null,
            },
            specs: {
                transmission,
                fuelType,
                seats: + seats,
            },
            features: JSON.parse(features),
            images,
        });

        response.json({ success: true, message: "Car added successfully." });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

// Get all available cars
export const getAllAvailableCars = async (request, response) => {
    try {
        const cars = await Car.find({ isAvailable: true }).populate({
            path: "agency",
            populate: {
                path: "owner",
                select: "image email",
            },
        });
        response.json({ success: true, cars });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

// Get cars of the logged-in agency
export const getAgencyCars = async (request, response) => {
    try {
        const agencyData = await Agency.findOne({ owner: request.auth().userId });
        if (!agencyData) {
            return response.json({ success: false, message: "Agency not found." });
        }

        const cars = await Car.find({ agency: agencyData._id.toString() }).populate("agency");
        response.json({ success: true, cars });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

// Toggle car availability
export const toggleCarAvailability = async (request, response) => {
    try {
        const { carId } = request.body;
        const car = await Car.findById(carId);
        if (!car) {
            return response.json({ success: false, message: "Car not found." });
        }
        car.isAvailable = !car.isAvailable;
        await car.save();
        response.json({ success: true, message: "Car availability updated successfully." });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
}