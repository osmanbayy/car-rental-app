import User from "../models/User.js";

export const authUser = async (request, response, next) => {
    try {
        const { userId } = request.auth();
        if (!userId) {
            return response.json({ success: false, message: "Not Authorized." });
        }

        let user = await User.findById(userId);
        if (!user) {
            return response.json({ success: false, message: "User not found." });
        }

        request.user = user;
        next();
    } catch (error) {
        console.log(error.message)
        response.json({ success: false, message: error.message });
    }
}