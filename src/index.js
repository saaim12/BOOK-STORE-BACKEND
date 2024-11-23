import mongoose from "mongoose";
import DB_NAME from'./constants';
import express from "express"
const app=express();
//writting iife for the immediately connection of database
(
    async()=>{
     try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("===>ERROR ON turnng on express",error)
        throw error;
       })
       app.listen(process.env.PORT,()=>{
        console.log("app is listening on port",process.env.PORT)
       })
     }   catch(error){
        console.log("===>ERROR ON CONNECTING DB",error)
        throw error;
    }
    } 
)()
