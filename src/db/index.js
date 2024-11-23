import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv';
dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not set.");
        }
        const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
        
        // Connect to MongoDB
        await mongoose.connect(uri);
        
        
        // Log the successful connection
        console.log(`\nMongoDB Connected! DB Host: ${mongoose.connection.host}`);
        
    } catch (error) {
        // Log the error and exit the process
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
};

export default connectDB;
