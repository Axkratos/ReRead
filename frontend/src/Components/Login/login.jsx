// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const { email, password } = formData;

      const response = await axios.post('http://localhost:5001/api/v1/user/signin', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      // Store the token in localStorage or a state management solution
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <Container className="login-container">
      <div className="login-form-controller">
        <h3>Login</h3>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            <Button variant="primary" onClick={handleLogin} className="login-button">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
