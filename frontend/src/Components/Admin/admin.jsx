// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/book/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleVerify = async (id) => {
    try {
      // Send the updated status in the request body
      const response = await axios.put(`http://localhost:5001/api/v1/book/books/${id}`, { status: 'Available' });
      // Update the local state after verification
      setBooks(prevBooks => prevBooks.map(book => {
        if (book._id === id) {
          return { ...book, status: 'Available' }; // Change status to 'Available'
        }
        return book;
      }));
    } catch (error) {
      console.error('Error verifying book:', error);
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/v1/book/books/${id}`);
      // Remove the deleted book from local state
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Admin Panel</h2>
      <ListGroup>
        {books.map(book => (
          <ListGroup.Item key={book._id}>
            <div>
              <h4>{book.title}</h4>
              <p>
                Author: {book.author}<br />
                Description: {book.description}<br />
                Price: {book.price}<br />
                Condition: {book.condition}<br />
                Genre: {book.genre}<br />
                Location: {book.location}<br />
                Status: {book.status}
              </p>
              <div className="d-flex justify-content-between">
                <Link to={`/admin/book/${book._id}`} className="btn btn-primary">View Details</Link>
                <Button variant="primary" onClick={() => handleVerify(book._id)} disabled={book.status === 'Available'}>Verify</Button>
                <Button variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminPanel;
