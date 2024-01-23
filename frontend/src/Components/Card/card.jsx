import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './card.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(
          `http://localhost:5001/api/v1/book/books/${bookId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, [bookId]);

  const handleBuyClick = async () => {
    try {
      const token = localStorage.getItem('accessToken');
  
      // Check the current status
      if (bookData.status === 'Booked') {
        window.alert('This book is already booked. Check back after 2 days to see if it is available.');
        return;
      }
  
      // Display a confirmation prompt
      const shouldBuy = window.confirm('Do you want to buy this book?');
  
      if (shouldBuy) {
        const response = await fetch(
          `http://localhost:5001/api/v1/book/books/${bookId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 'Booked' }),
          }
        );
  
        if (response.ok) {
          // Successfully updated, you can reload the book data or update state
          // to reflect the changes.
          const updatedBookData = await response.json();
          setBookData(updatedBookData);
        } else {
          console.error('Error updating book status:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error updating book status:', error);
    }
  };
  

  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail">
      <h2>{bookData.title}</h2>
      <p>Posted Date: {new Date(bookData.createdAt).toLocaleDateString()}</p>
      <img src={bookData.photo} alt={bookData.title} className="book-photo" />
      <p>Description: {bookData.description}</p>
      <p>Location: {bookData.location}</p>
      <div>
        <button type="button" onClick={handleBuyClick}>
          {bookData.status === 'Available' ? 'Buy' : 'Booked'}
        </button>
        <label>Status: {bookData.status}</label>
      </div>
    </div>
  );
};

export default BookDetail;
