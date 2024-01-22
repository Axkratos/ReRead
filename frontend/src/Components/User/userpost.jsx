// UserPosts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './userpost.css'

const UserPosts = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '', // Add other fields as needed
    location: '',
    condition: '',
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          `http://localhost:5001/api/v1/book/books?sellerName=${localStorage.getItem('User')}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  const handleUpdateClick = (postId) => {
    const selectedPost = userPosts.find((post) => post._id === postId);
    setFormData({
      title: selectedPost.title,
      description: selectedPost.description,
      author: selectedPost.author,
      location: selectedPost.location,
      condition: selectedPost.condition,
    });
    setShowUpdateForm(true);
    setSelectedPostId(postId);
  };

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(
        `http://localhost:5001/api/v1/book/books/${selectedPostId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Post updated successfully:', response.data);
      setShowUpdateForm(false);
      // You may want to fetch the user's posts again after updating
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(
        `http://localhost:5001/api/v1/book/books/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Post deleted successfully:', response.data);
      // You may want to fetch the user's posts again after deleting
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className="user-posts-container">
      <div className="user-posts-form-controller">
        <h3>Your Posts</h3>
        {userPosts.map((post) => (
          <Card key={post._id} className="mb-3">
            <Card.Body>
              {/* Display post details */}
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>Description: {post.description}</Card.Text>
              <Card.Text>Author: {post.author}</Card.Text>
              <Card.Text>Location: {post.location}</Card.Text>
              <Card.Text>Condition: {post.condition}</Card.Text>

              {/* Update and delete buttons */}
              <Button variant="primary" onClick={() => handleUpdateClick(post._id)}>
                Update Post
              </Button>
              <Button variant="danger" onClick={() => handleDeletePost(post._id)}>
                Delete Post
              </Button>

              {/* Update form */}
              {showUpdateForm && selectedPostId === post._id && (
                <Form>
                  <Form.Group controlId="formTitle">
                    <Form.Label>New Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the new title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>New Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter the new description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAuthor">
                    <Form.Label>New Author</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the new author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLocation">
                    <Form.Label>New Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the new location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formCondition">
                    <Form.Label>New Condition</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the new condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleUpdatePost}>
                    Update Post
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default UserPosts;
