// SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import './searchresult.css';

const SearchResults = ({ books }) => {
  const renderBookCards = () => {
    return books.map((book) => (
      <Link key={book._id} to={`/books/${book._id}`} className="card-link">
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

  return (
    <div className="search-results-container">
      <h2 className="search-results-title">Search Results</h2>
      {books.length > 0 ? (
        <div className="card-container">{renderBookCards()}</div>
      ) : (
        <p className="no-results-message">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
