import dotenv from 'dotenv';
import express from "express"
// Load environment variables from the .env file as soon as the app starts
dotenv.config({ path: './env' });
const app=express()
import connectDB from "./db/index.js";

connectDB()
.then(
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is running on port: ${process.env.PORT} `)
  })
)
.catch(()=>{
  console.log("mongo DB connection failed");
})