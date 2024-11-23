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
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
     
    },
    reviews: {
      type: Number,
    },
    stock: {
      type: Number,
     
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
      type: String, // maybe cloudinary
      trim: true,
    },
  },
);

export const Book = mongoose.model('Book', bookSchema);
