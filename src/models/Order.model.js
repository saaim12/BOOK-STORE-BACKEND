import mongoose, { Schema } from 'mongoose';

// Order schema definition
const orderSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User collection
      required: true,
    },
    books: [
      {
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
        price: {
          type: Number,
          required: true, // Price of the book at the time of the order
        },
      },
    ],
    total_price: {
      type: Number,
      required: true, // Calculated total price based on book prices and quantities
    },
    delivery_address: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      enum: ['credit-card', 'paypal', 'cash-on-delivery'], // Example payment methods
    },
    order_status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], // Order status options
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Order = mongoose.model('Order', orderSchema);
