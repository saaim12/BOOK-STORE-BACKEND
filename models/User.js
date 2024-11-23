import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
     
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    coverimage: {
      type: String, //cloudinary url
    },

    password: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
    // Only hash the password if it is new or has been modified
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8); // Await bcrypt hash
    next();
  });
  
userSchema.methods.isPasswordCorrect=async function (password) {
  return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,

    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User = mongoose.model("User", userSchema);
//we have to use mongoose pre hook so just before the password saving to database it encrypts it
// Why not use an arrow function in Mongoose pre-hooks?
// this Binding in Arrow Functions: In JavaScript, arrow functions do not have their own this. Instead, they inherit this from the surrounding lexical context. In the case of a Mongoose pre-hook, the this keyword is supposed to refer to the document being saved (an instance of the model). However, if you use an arrow 
// function, this will not refer to the document but rather to the surrounding scope,
//  which is likely the module or global object.
