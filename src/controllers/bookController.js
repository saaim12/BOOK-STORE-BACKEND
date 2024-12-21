import { Book } from '../models/Books.model.js';

// to Add a  new book
export const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = new Book(bookData);
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book', details: err });
  }
};

// to Fetch all books
export const getBooks = async (req, res) => {
  const { page = 1, limit = 20 } = req.query; // Default page 1 and limit 20
  const skip = (page - 1) * limit; // Calculate the skip value based on page

  try {
    const books = await Book.find()
      .skip(Number(skip)) // Skip the first N books based on page
      .limit(Number(limit)); // Limit the number of books to 'limit'
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err });
  }
};
