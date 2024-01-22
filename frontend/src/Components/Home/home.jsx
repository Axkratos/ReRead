import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './searchform.jsx';
import SearchResults from './searchresult.jsx';
import BookDetails from '../Card/card.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [usedBooks, setUsedBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
       const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:5001/api/v1/book/books',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        
        });
        const data = await response.json();
        setAllBooks(data);
        setUsedBooks(data.filter((book) => book.condition === 'Used'));
        setFictionBooks(data.filter((book) => book.genre === 'Fiction'));
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

  const renderDefaultSections = () => {
    return (
      <>
        <div className="all-books-section">
          <h2>All Books</h2>
          <Slider {...sliderSettings}>{renderBookCards(allBooks)}</Slider>
        </div>
        <div className="used-books-section">
          <h2>Used Books</h2>
          <Slider {...sliderSettings}>{renderBookCards(usedBooks)}</Slider>
        </div>
        <div className="fiction-books-section">
          <h2>Fiction Books</h2>
          <Slider {...sliderSettings}>{renderBookCards(fictionBooks)}</Slider>
        </div>
      </>
    );
  };

  const renderBookCards = (books) => {
    return books.map((book) => (
      <Link to={`/books/${book._id}`} key={book._id}>
        <div onClick={() => handleCardClick(book._id)}>
          <img src={book.photo} alt={book.title} className="book-photo" />
          <h4 className="book-name">{book.title}</h4>
          <p className="book-location">{`Location: ${book.location}`}</p>
          <p className="book-price">{`Price: Rs ${book.price}`}</p>
        </div>
      </Link>
    ));
  };

  const handleCardClick = (bookId) => {
    setSelectedBookId(bookId);
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
      <h1>Book Search</h1>
      <SearchForm onSearch={handleSearch} />

      {/* Conditionally render either search results or default sections */}
      {searchResults.length > 0 ? (
        <SearchResults books={searchResults} onCardClick={handleCardClick} />
      ) : (
        renderDefaultSections()
      )}

      {/* Render the selected book details */}
      {selectedBookId && <BookDetails bookId={selectedBookId} />}
    </div>
  );
};

export default Home;
