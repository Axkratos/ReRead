// UserDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ userId, userName, onLogout }) => {
  return (
    <div className="user-dropdown">
      <span>{`User ID: ${userId}`}</span>
      <span>{`User Name: ${userName}`}</span>
      <Link to="/sell-book">Sell Book</Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserDropdown;
