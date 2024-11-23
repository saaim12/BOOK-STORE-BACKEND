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
    pages: {
      type: Number,
    },
    language: {
      type: String,
    },
    discount: {
      type: String,
      default: '0%', // Default discount value
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Default stock value
    },
    coverType: {
      type: String,
      
    },
    paperType: {
      type: String,
      
    },
    isbn: {
      type: String,
      unique: true,
      trim: true,
    },
    publishDate: {
      type: Date,
    },
    url: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,// maybe cloudinary
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User collection
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const Book = mongoose.model('Book', bookSchema);
