// src/components/SellBook.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

import './sellbook.css'

import { useNavigate } from 'react-router-dom';


const SellBook = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    condition: '',
    genre: '',
    location: '',
    photo: null,
    sellerName: localStorage.getItem('User'),
    type: '', 
    available:"Buy",
    status:"Available"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSellBook = async () => {
    try {
      const {
        title,
        author,
        description,
        price,
        condition,
        genre,
        location,
        photo,
        type,
        available='Buy',
        status='Available'
      } = formData;

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', title);
      formDataToSubmit.append('author', author);
      formDataToSubmit.append('description', description);
      formDataToSubmit.append('price', price);
      formDataToSubmit.append('condition', condition);
      formDataToSubmit.append('genre', genre);
      formDataToSubmit.append('location', location);
      formDataToSubmit.append('sellerName', localStorage.getItem('User'));
      formDataToSubmit.append('photo', photo);
      formDataToSubmit.append('type', type);
      formDataToSubmit.append('status', 'Available');
      formDataToSubmit.append('available', 'Buy'); // Add type to form data

      const response = await axios.post(
        'http://localhost:5001/api/v1/book/books',
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Book added successfully:', response.data);
      navigate('/')
      // Handle the response as needed (e.g., redirect to a success page)
    } catch (error) {
      console.error('Error during book addition:', error.message);
    }
  };

  return (
    <Container className="sell-book-container">
      <div className="sell-book-form-controller">
        <h3>Sell a Book</h3>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the book title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the author's name"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a brief description of the book"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price in Rs</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the book price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCondition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              as="select"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              {/* Add more conditions as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Competitive Books">Competitive Books</option>
              <option value="Novels">Novels</option>
              {/* Add more types as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              {/* Add more genres as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group controlId="formPhoto">
            <Form.Label>Book Cover Photo</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png"
              name="photo"
              onChange={handleFileChange}
            />
          </Form.Group>
          <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            <Button variant="primary" onClick={handleSellBook} className="sell-book-button">
              Sell Book
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SellBook;
