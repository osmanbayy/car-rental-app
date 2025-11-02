import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";
import stripe from "stripe";
import transporter from "../config/nodemailer.js";

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

        const mailOptions = {
            from: process.env.SENDER_EMAIL, // The email have used for createing the brevo account
            to: request.user.email,
            subject: "Car Booking/Sale",
            html: `
              <h2>Your Booking Details</h2>
              <p>Thank You for your booking! Below are your booking details:</p>
              <ul>
                <li><strong>Booking ID:</strong> ${newBooking._id}</li>
                <li><strong>Agency Name:</strong> ${carData.agency.name}</li>
                <li><strong>Location:</strong> ${carData.address}</li>
                <li><strong>Date: </strong>${newBooking.pickUpDate.toDateString()}-${newBooking.dropOffDate.toDateString()}</li>
                <li><strong>Booking Amount:</strong>${process.env.CURRENCY || "$"}${newBooking.totalPrice} for ${numberOfDays} days</li>
              </ul>
              <p>We are excited to welcome you soon.</p>
              <p>Need to change something? Contact Us.</p>
            `
        };

        await transporter.sendMail(mailOptions);

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
        const agency = await Agency.findOne({ owner: request.auth().userId });
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
        const { bookingId } = request.body;
        const booking = await Booking.findById(bookingId);
        const carData = await Car.findById(booking.car).populate("agency");
        const totalPrice = booking.totalPrice;
        const { origin } = request.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: carData.agency.name },
                    unit_amount: totalPrice * 100,
                },
                quantity: 1,
            }
        ];

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/processing/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: { bookingId }
        });

        response.json({ success: true, url: session.url })
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error.message);
    }
};