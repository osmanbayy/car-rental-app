import express from "express";
import cors from "cors";
import "dotenv/config"
import connectToDatabase from "./config/mongodb.js";

await connectToDatabase();  // Establish Connection to the Database

const app = express();      // Initialize Express
app.use(cors())             // Enables Cross-Origin Resource sharing

// Middleware Setup
app.use(express.json());    // Enables JSON request body parsing

// Route Endpoint to check API Status
app.get("/", (request, response) => response.send("API Successfully Connected!"));

const port = process.env.PORT || 4000

// start the server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));