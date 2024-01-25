import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './card.css'; // Make sure to include the correct CSS file

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const isAuthenticated = localStorage.getItem('accessToken');
  const navigate = useNavigate();

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
        navigate('/signin');
      }
    };

    fetchData();
  }, [bookId, navigate]);

  const handleBuyClick = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (bookData.sellerName === localStorage.getItem('User')) {
        window.alert('You cannot buy your own book.');
        return;
      }

      if (bookData.status === 'Booked') {
        window.alert('This book is already booked. Check back after 2 days to see if it is available.');
        return;
      }

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
    <div className="book-detail-container">
      <div className="book-detail">
        <h2>{bookData.title}</h2>
        <p>Posted Date: {new Date(bookData.createdAt).toLocaleDateString()}</p>
        <img src={bookData.photo} alt={bookData.title} className="book-photo" />
        <p>Description: {bookData.description}</p>
        <p>Location: {bookData.location}</p>
        <div className="status-section">
          <button type="button" onClick={handleBuyClick}>
            {bookData.status === 'Available' ? 'Buy Now' : 'Booked'}
          </button>
          <label>Status: {bookData.status}</label>
        </div>
      </div>

      {/* Message Section */}
      <div className="message-section">
        <h3>Chat With Seller: {bookData.sellerName}</h3>
        <div className="message-input-section">
          <textarea placeholder="Type your message..." rows="4"></textarea>
          <div className="message-buttons">
            <button className="send-button">Send Message</button>
            <span>OR</span>
            <a
              href={`https://wa.me/${bookData.sellerPhoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="whatsapp-button">WhatsApp</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
