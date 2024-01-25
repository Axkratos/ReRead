// SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './searchresult.css';

const SearchResults = ({ books, onCardClick }) => {
  const renderBookCards = () => {
    return books.map((book) => (
      <Link key={book._id} to={`/books/${book._id}`} className="card-link">
        {/* Use Link to navigate to the book details */}
        <div className="card">
          <img src={book.photo} alt={book.title} className="book-photo" />
          <div className="card-details">
            <h4 className="book-name">{book.title}</h4>
            <p className="book-location">{`Location: ${book.location}`}</p>
            <p className="book-price">{`Price: Rs ${book.price}`}</p>
          </div>
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
    <div className="search-results-container">
      <h2 className="search-results-title">Search Results</h2>
      {books.length > 0 ? (
        <Slider {...sliderSettings}>{renderBookCards()}</Slider>
      ) : (
        <p className="no-results-message">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
