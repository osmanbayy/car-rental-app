import express from 'express';
import { authUser } from '../middleware/authMiddleware.js';
import { bookingPaymentStripe, checkBookingAvailability, createBooking, getAgencyBookings, getUserBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkBookingAvailability);
bookingRouter.post('/book', authUser, createBooking);
bookingRouter.get('/user', authUser, getUserBookings);
bookingRouter.get('/agency', authUser, getAgencyBookings);
bookingRouter.post('/stripe', authUser, bookingPaymentStripe);

export default bookingRouter;