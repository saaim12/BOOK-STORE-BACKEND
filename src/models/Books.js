import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    page: {
      type: Number,
    },
    language: {
      type: String,
    },
    discount_rate: {
      type: String,
      default: '0%', // Default discount value
    },
    discounted_price: {
      type: float,
     
    },
    price: {
      type: Number,
      required: true,
    },
    
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    reviews:{
      type:Number
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Default stock value
    },
    cover: {
      type: String,
      
    },
    paper: {
      type: String,
      
    },
    isbn: {
      type: String,
      unique: true,
      trim: true,
    },
    date: {
      type: Date,
    },
    link: {
      type: String,
      trim: true,
    },
    image: {
      type: String,// maybe cloudinary
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User collection
      required: true,
    },
  },
 
);

export const Book = mongoose.model('Book', bookSchema);
