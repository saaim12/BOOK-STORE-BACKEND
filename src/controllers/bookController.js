import { Book } from '../models/book.js';

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
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err });
  }
};
