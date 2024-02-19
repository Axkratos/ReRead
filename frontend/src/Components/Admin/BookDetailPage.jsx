import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/book/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error.message);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Price:</strong> {book.price}</p>
          <p><strong>Condition:</strong> {book.condition}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Location:</strong> {book.location}</p>
          <p><strong>Type:</strong> {book.type}</p>
          <p><strong>Seller Name:</strong> {book.sellerName}</p>
          <p><strong>Seller Phone:</strong> {book.sellerPhone}</p>
          <p><strong>Status:</strong> {book.status}</p>
          <img src={book.photo} alt={book.title} className="book-photo" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetailPage;
``
