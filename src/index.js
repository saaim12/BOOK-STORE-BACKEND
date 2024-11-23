import dotenv from 'dotenv';
import express from "express";
import connectDB from "./db/index.js";

// Load environment variables from the .env file as soon as the app starts
dotenv.config({ path: './env' });

const app = express();

// Connect to the database
connectDB()
  .then(() => {
    // Start the server after the database connection is established
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
