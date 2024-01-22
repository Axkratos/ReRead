import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './navbar.css';

const AppNavbar = () => {
  const isAuthenticated = localStorage.getItem('accessToken'); 
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container className="horiz">
        {/* Left Side */}
        <Navbar.Brand href="/" className="logo">
          Logo
        </Navbar.Brand>

        

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
            {isAuthenticated ? (
              <NavDropdown title="User" id="basic-nav-dropdown">
                <LinkContainer to="/user-profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/user-post">
                  <NavDropdown.Item>My Posts</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/">
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/signin">
                  <Nav.Link className="transparent-button">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link className="transparent-button">Register</Nav.Link>
                </LinkContainer>
              </>
            )}
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
