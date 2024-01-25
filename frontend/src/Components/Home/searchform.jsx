// SearchForm.js
import React, { useState } from 'react';
import './searchform.css';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    genre: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log the search parameters
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>SEARCH BOOK</label>
      <label>
        Title
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Type
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Competitive Books">Competitive Books</option>
          <option value="Novels">Novels</option>
        </select>
      </label>
      <label>
        Genre
        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
