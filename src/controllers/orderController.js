import {Order} from '../models/Order.model.js';
import {Book} from '../models/Books.model.js';

// Add a new order
export const addOrder = async (req, res) => {
  try {
    const { user_id, books, delivery_address, payment_method } = req.body;

    // Fetch book details (including prices)
    const bookIds = books.map((item) => item.book_id);
    const bookDetails = await Book.find({ '_id': { $in: bookIds } });

    let totalPrice = 0;
    
    // Calculate total price
    const orderBooks = books.map((item) => {
      const book = bookDetails.find((b) => b._id.toString() === item.book_id.toString());
      if (book) {
        totalPrice += book.price * item.quantity; // Price * Quantity
        return {
          book_id: book._id,
          quantity: item.quantity,
          price: book.price,
        };
      }
      return null;
    }).filter(item => item !== null);

    // Create a new order
    const newOrder = new Order({
      user_id,
      books: orderBooks,
      total_price: totalPrice,
      delivery_address,
      payment_method,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to place order.',
    });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user_id', 'name email') // Populate user details
      .populate('books.book_id', 'title author price') // Populate book details
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch orders.',
    });
  }
};
