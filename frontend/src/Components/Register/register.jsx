// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import './register.css'
import { useNavigate} from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const { username, email, password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      const response = await axios.post('http://localhost:5001/api/v1/user/signup', {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log('Registration successful:', response.data);
      navigate("/signin")
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <Container className="register-container">
      <div className="register-form-controller">
        <h3>Register</h3>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Your Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ex. james@bond.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            <Button variant="primary" onClick={handleRegister} className="register-button">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
