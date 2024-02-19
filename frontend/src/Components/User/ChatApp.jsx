import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SellerChat = ({ sellerUsername }) => {
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:5001'); // Connect to WebSocket server

  useEffect(() => {
    // Fetch messages for this seller from the server
    fetchMessages();

    // Listen for incoming messages
    socket.on(`message-${sellerUsername}`, (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Cleanup function
      socket.disconnect();
    };
  }, [sellerUsername]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5001/messages/${sellerUsername}`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = (message) => {
    if (message.trim() !== '') {
      socket.emit('message', { sender: 'buyer', content: message, receiver: sellerUsername });
    }
  };

  return (
    <div>
      <h1>Chat with {sellerUsername}</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong> {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default SellerChat;
