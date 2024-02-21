import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';

const AppNavbar = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Remove data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('User');

    // Redirect to home
    navigate('/');
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (eventKey, event) => {
    setShowDropdown(false); // Close dropdown when an item is clicked
  };

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container className="horiz">
        {/* Left Side */}
        <Navbar.Brand href="/" className="logo">
          ReRead
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
          <Nav className="prayojan">
            {isAuthenticated ? (
              <NavDropdown
                title="User"
                id="basic-nav-dropdown"
                 // Added onClick event to close on click
              >
                <LinkContainer to="/user-post">
                  <NavDropdown.Item eventKey="posts">Posts</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
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
              <Nav.Link className="transparent-button">Add Book</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
