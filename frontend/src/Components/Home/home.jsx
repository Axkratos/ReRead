import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './searchform.jsx';
import SearchResults from './searchresult.jsx';
import BookDetails from '../Card/card.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:5001/api/v1/book/books', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAllBooks(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (params) => {
    const filteredBooks = allBooks.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(params.title.toLowerCase());
      const typeMatch = params.type ? book.type === params.type : true;
      const genreMatch = params.genre ? book.genre === params.genre : true;

      return titleMatch && typeMatch && genreMatch;
    });

    setSearchResults(filteredBooks);
    setSelectedBookId(null);
  };

  const renderDefaultSection = () => {
    return (
      <div className="all-books-section">
        <h2 >All Books</h2>
        <div className="book-cards-container">{renderBookCards(allBooks)}</div>
      </div>
    );
  };

  const renderBookCards = (books) => {
    return books.map((book) => (
      <div className='individual-book'>
        <Link to={`/books/${book._id}`} key={book._id}>
          <div onClick={() => handleCardClick(book._id)}>
            <img src={book.photo} alt={book.title} className="book-photo" />
            <div className="book-details">
              <h4 className="book-name">{book.title}</h4>
              <p className="book-author">{`By ${book.author}`}</p>
              <p className="book-location">{`Location: ${book.location}`}</p>
              <p className="book-price">{`Price: Rs ${book.price}`}</p>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  const handleCardClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">WELCOME TO REREAD NEPAL.</h1>

      <SearchForm onSearch={handleSearch} />

      {/* Conditionally render either search results or default section */}
      {searchResults.length > 0 ? (
        <SearchResults books={searchResults} onCardClick={handleCardClick} />
      ) : (
        renderDefaultSection()
      )}

      {/* Render the selected book details */}
      {selectedBookId && <BookDetails bookId={selectedBookId} />}
    </div>
  );
};

export default Home;
