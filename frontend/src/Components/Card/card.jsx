// BookCard.js

import React, { useState, useEffect } from 'react';
import './card.css';

const BookCard = ({ bookId }) => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint or data fetching logic
        const response = await fetch('http://localhost:5001/api/v1/book/books');
        const data = await response.json();

        setBookData(data); // Assuming data structure matches the expected format
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, [bookId]);

  if (!bookData) {
    return null; // You can render a loading spinner or placeholder while data is being fetched
  }

  // Filter the bookData array to include only books with the condition "Used"
  const usedBooks = bookData.filter((book) => book.condition === 'Used');

  return (
    <div className="book-card">
      {usedBooks.map((book) => (
        <div key={book._id} className="individual-card">
          <img src={book.photo} alt={book.title} className="book-photo" />
          <div className="book-details">
            <h4 className="book-name">{book.title}</h4>
            <p className="book-location">{`Location: ${book.location}`}</p>
            <p className="book-price">{`Price: Rs ${book.price}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
