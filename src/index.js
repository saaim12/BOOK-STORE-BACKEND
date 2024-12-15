import dotenv from 'dotenv';
import express from "express";
import connectDB from "./db/index.js";
import cors from 'cors'; // If you're handling cross-origin requests
import morgan from 'morgan'; // For logging HTTP requests
import helmet from 'helmet'; // To secure HTTP headers
import xss from 'xss-clean'; // To sanitize user input
import rateLimit from 'express-rate-limit'; // To limit the number of requests from an IP

// Routes imports
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from the .env file as soon as the app starts
dotenv.config({ path: './env' });

const app = express();

// Middleware setup
app.use(helmet()); // Add HTTP headers security
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log all incoming requests
app.use(express.json()); // Parse incoming requests with JSON payloads




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

// Routes
app.use('/auth', authRoutes); // Authentication routes (login, register)
app.use('/books', bookRoutes); // Book routes (add book, get all books)
app.use('/orders', orderRoutes); // Order routes (add order, get all orders)


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});
