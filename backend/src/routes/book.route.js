import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from '../controllers/book.controller.js';
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

// Create a new book
router.post('/books',upload.single("photo"), createBook);

// Get all books
router.get('/books', getAllBooks);

// Get a specific book by ID
router.get('/books/:id', getBookById);

// Update a book by ID
router.put('/books/:id', updateBookById);

// Delete a book by ID
router.delete('/books/:id', deleteBookById);

export default router;
