import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './card.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const isAuthenticated = localStorage.getItem('accessToken');
  const navigate = useNavigate(); // Use the useNavigate hook

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
        // Redirect to signin page if there's an error
        navigate('/signin');
      }
    };

    fetchData();
  }, [bookId, navigate]); // Include navigate in the dependency array

  // ...

const handleBuyClick = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    // Check if the seller is trying to buy their own book
    if (bookData.sellerName === localStorage.getItem('User')) {
      window.alert('You cannot buy your own book.');
      return;
    }

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

   

    <div>
      {isAuthenticated ? (
        <div>
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

<div className="message-section">
<h3>Chat With Seller: {bookData.sellerName}</h3>
<div className="message-input-section">
  <textarea placeholder="Type your message..." rows="4"></textarea>
  <div className="message-buttons">
    <button className="send-button">Send Message</button>
    <span>OR</span>
    <a
      href={`https://wa.me/${bookData.sellerPhone}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="whatsapp-button">WhatsApp</button>
    </a>
  </div>
</div>
</div>
</div>
      ) : (
        navigate('/signin')
      )}

    </div>
  );
};

export default BookDetail;
