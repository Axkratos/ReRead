// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './navbar.css';

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container className='horiz'>
        {/* Left Side */}
        <Navbar.Brand href="/" className="logo">
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/used-books">
              <Nav.Link className="nav-link">Used Book</Nav.Link>
            </LinkContainer>


            <LinkContainer to="/competitive-books">
              <Nav.Link className="nav-link">Competitive Books</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/novels">
              <Nav.Link className="nav-link">Novels</Nav.Link>
            </LinkContainer>

            
              
            

           
          </Nav>
        </Navbar.Collapse>

        {/* Right Side */}
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <LinkContainer to="/signin">
              <Nav.Link className="transparent-button">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link className="transparent-button">Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sell-book">
              <Nav.Link className="transparent-button">Sell Book</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
