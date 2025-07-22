import 'dotenv/config'; // Ensures environment variables are loaded first
import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * It reads the database URL from environment variables.
 */
const connectDB = async () => {
    // Check if the MONGODB_URL is loaded correctly.
    if (!process.env.MONGODB_URL) {
        console.error("FATAL ERROR: MONGODB_URL is not defined in .env file.");
        process.exit(1); // Exit the application if the database URL is missing
    }

    try {
        // Attempt to connect to the MongoDB database.
        await mongoose.connect(process.env.MONGODB_URL);
        
        // If the connection is successful, log a confirmation message.
        console.log("Database connected successfully.");

    } catch (error) {
        // If an error occurs during connection, log the error and exit the application.
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
