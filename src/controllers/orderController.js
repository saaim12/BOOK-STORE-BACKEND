import { Order } from '../models/order.js';

// Add new order
export const addOrder = async (req, res) => {
  try {
    const { user_id, book_id, quantity, total_price } = req.body;
    const newOrder = new Order({ user_id, book_id, quantity, total_price });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err });
  }
};

// Fetch all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id').populate('book_id');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err });
  }
};
