// SearchResults.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

const SearchResults = ({ books, onCardClick }) => {
  const renderBookCards = () => {
    return books.map((book) => (
      <Link key={book._id} to={`/books/${book._id}`}>
        {/* Use Link to navigate to the book details */}
        <div>
          <img src={book.photo} alt={book.title} className="book-photo" />
          <h4 className="book-name">{book.title}</h4>
          <p className="book-location">{`Location: ${book.location}`}</p>
          <p className="book-price">{`Price: Rs ${book.price}`}</p>
        </div>
      </Link>
    ));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Search Results</h2>
      {books.length > 0 ? (
        <Slider {...sliderSettings}>{renderBookCards()}</Slider>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
