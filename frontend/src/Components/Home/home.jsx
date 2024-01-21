// BookCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import BookDetail from '../Card/card.jsx'; // Import the BookDetail component

const BookCard = ({ bookId }) => {
  const [bookData, setBookData] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/book/books');
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, [bookId]);

  if (!bookData) {
    return null;
  }

  // Filter the bookData array to include only books with the condition "Used"
  

  const openBookDetail = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="book-card">
      {bookData.map((book) => (
        <Link to={`/books/${book._id}`} key={book._id} className="individual-card">
          <div onClick={() => openBookDetail(book)}>
            <img src={book.photo} alt={book.title} className="book-photo" />
            <div className="book-details">
              <h4 className="book-name">{book.title}</h4>
              <p className="book-location">{`Location: ${book.location}`}</p>
              <p className="book-price">{`Price: Rs ${book.price}`}</p>
            </div>
          </div>
        </Link>
      ))}

      {selectedBook && <BookDetail book={selectedBook} onClose={closeBookDetail} />}
    </div>
  );
};

export default BookCard;
