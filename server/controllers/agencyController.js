import User from "../models/User.js";
import Agency from "../models/Agency.js";

// Register a new agency for the logged in user
export const agencyRegister = async (request, response) => {
    try {
        const { name, email, address, contact, city } = request.body;
        const owner = request.user._id;

        // Check if user already has an agency registered
        const agency = await Agency.findOne({ owner });
        if (agency) {
            return response.json({ success: false, message: "Agency already registered." });
        }

        await Agency.create({ name, email, address, contact, city, owner });
        await User.findByIdAndUpdate(owner, { role: "agencyOwner" });

        response.json({ success: true, message: "Agency Registered Successfully." });

    } catch (error) {
        console.log(error.message)
        response.json({ success: false, message: error.message });
    }
}