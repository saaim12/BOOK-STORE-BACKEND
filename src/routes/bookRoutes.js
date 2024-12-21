import express from 'express';
import { addBook, getBooks } from '../controllers/bookController.js';

const router = express.Router();

router.post('/add', addBook);
router.get('/allbooks', getBooks);

export default router;
