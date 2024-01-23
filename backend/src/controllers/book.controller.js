import { Book } from '../models/book.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

// Create a new book
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      condition,
      genre,
      location,
      type,
      sellerName,
      available,
      status
    } = req.body
    console.log(sellerName)
    const img = req.file.path
    const imgObj = await uploadOnCloudinary(img)
    const newBook = await Book.create({
      title,
      author,
      description,
      type,
      price,
      genre,
      location,
      condition,
      sellerName,
      available:"Buy",
      status:"Available",
      photo: imgObj.url, 
    })

    console.log(newBook)

    res.status(201).json({ success: 'ok', newBook })
  } catch (error) {
    // Handle errors
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Get all books
export const getAllBooks = async (req, res) => {
  const token = req.cookies.token
  try {
    const allBooks = await Book.find()
    res.status(200).json(allBooks)
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Get a specific book by ID
export const getBookById = async (req, res) => {
  const { id } = req.params
  const token = req.cookies.token

  try {
    const book = await Book.findById(id)
    if (!book) {
      res.status(404).json({ error: 'Book not found' })
      return
    }
    res.status(200).json(book)
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Update a book by ID
export const updateBookById = async (req, res) => {
  const { id } = req.params
  const token = req.cookies.token

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedBook) {
      res.status(404).json({ error: 'Book not found' })
      return
    }
    res.status(200).json(updatedBook)
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Delete a book by ID
export const deleteBookById = async (req, res) => {
  const { id } = req.params
  const token = req.cookies.token

  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
      res.status(404).json({ error: 'Book not found' })
      return
    }
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
