import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";
import stripe from "stripe";

// Internal Helper
const checkAvailability = async ({ car, pickUpDate, dropOffDate }) => {
    try {
        const bookings = await Booking.find({ car, pickUpDate: { $lte: dropOffDate }, dropOffDate: { $gte: pickUpDate } });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.log(error.message);
    }
}

// To Check Car Availability
export const checkBookingAvailability = async (request, response) => {
    try {
        const { car, pickUpDate, dropOffDate } = request.body;
        const isAvailable = await checkAvailability({ car, pickUpDate, dropOffDate });
        response.json({ success: true, isAvailable });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
};

// Create a new booking
export const createBooking = async (request, response) => {
    try {
        const { car, pickUpDate, dropOffDate } = request.body;
        const user = request.user._id;

        const isAvailable = await checkAvailability({ car, pickUpDate, dropOffDate });
        if (!isAvailable) {
            return response.json({ success: false, message: "Car is not available for the selected dates." });
        }
        // Get total price from car
        const carData = await Car.findById(car).populate("agency");
        if (!carData) {
            return response.json({ success: false, message: "Car not found." });
        }
        let totalPrice = carData.price.rent;

        // Calculate total price based on number of days
        const pickUp = new Date(pickUpDate);
        const dropOff = new Date(dropOffDate);
        const timeDiff = dropOff.getTime() - pickUp.getTime();
        const numberOfDays = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
        totalPrice = totalPrice * numberOfDays;

        const newBooking = new Booking({
            user,
            car,
            agency: carData.agency._id,
            pickUpDate,
            dropOffDate,
            totalPrice,
        });

        await newBooking.save();
        response.json({ success: true, message: "Booking created successfully." });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

// Get bookings of the logged-in user
export const getUserBookings = async (request, response) => {
    try {
        const user = request.user._id;
        const bookings = await Booking.find({ user }).populate("car agency").sort({ createdAt: -1 });
        response.json({ success: true, bookings });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
};

// Get bookings of the logged-in agency
export const getAgencyBookings = async (request, response) => {
    try {
        const agency = await Agency.findOne({ owner: req.auth().userId });
        if (!agency) {
            return response.json({ success: false, message: "Agency not found." });
        }

        const bookings = await Booking.find({ agency: agency._id.toString() }).populate("car agency user").sort({ createdAt: -1 });
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + (booking.isPaid ? booking.totalPrice : 0), 0);
        response.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } });
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

// Stripe Payment Intent
export const bookingPaymentStripe = async (request, response) => {
    try {
        
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
};