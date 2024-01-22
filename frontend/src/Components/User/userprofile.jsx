// UserProfile.js
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data based on userId
        const response = await fetch(`http://localhost:5001/api/v1/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Perform API call to update user data
      const response = await fetch(`http://localhost:5001/api/v1/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>
          Full Name:
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.fullName}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Phone:
          {isEditing ? (
            <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
          ) : (
            <span>{userData.phone}</span>
          )}
        </label>
      </div>
      {/* Add other user data fields as needed */}

      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
