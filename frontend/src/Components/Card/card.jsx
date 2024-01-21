// BookDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for extracting URL parameters
import './card.css';  // Create a CSS file for styling if needed

const BookDetail = () => {
  const { bookId } = useParams(); // Extract bookId from URL parameters
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/book/books/${bookId}`);
        const data = await response.json();
        setBookData(data);  // Assuming data structure matches the expected format
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, [bookId]);

  if (!bookData) {
    return <div>Loading...</div>;  // You can render a loading spinner or placeholder while data is being fetched
  }

  return (
    <div className="book-detail">
      <h2>{bookData.title}</h2>
      <p>Posted Date: {new Date(bookData.createdAt).toLocaleDateString()}</p>
      <img src={bookData.photo} alt={bookData.title} className="book-photo" />
      <p>Description:{bookData.description}</p>
      <p>Location: {bookData.location}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default BookDetail;
