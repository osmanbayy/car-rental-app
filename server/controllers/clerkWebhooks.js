import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (request, response) => {
    try {
        // Creating a Svix instance
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        // Get Headers
        const headers = {
            "svix-id": request.headers["svix-id"],
            "svix-timestamp": request.headers["svix-timestamp"],
            "svix-signature": request.headers["svix-signature"]
        }

        // Verifying Headers
        await whook.verify(JSON.stringify(request.body), headers);

        // Getting Data from request body
        const { data, type } = request.body;

        // Switch Cases for different events
        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                await User.create(userData);
                break;
            }
            case "user.updated": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id, userData);
                break;
            }
            default:
                break;
        }

        response.json({ success: true, message: "Webhook Received." });

    } catch (error) {
        console.log(error.message); 
        response.json({ success: false, message: error.message });

    }
}

export default clerkWebhooks