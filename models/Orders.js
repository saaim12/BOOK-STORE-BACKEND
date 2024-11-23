import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User collection
        required: true,
      },
      book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to Book collection
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
      },
      order_date: {
        type: Date,
        default: Date.now, // Default to current date and time
      },
      total_price: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );
  
  export const Order = mongoose.model('Order', orderSchema);
  