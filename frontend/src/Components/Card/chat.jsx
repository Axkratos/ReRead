import React, { useState } from 'react';
import io from 'socket.io-client';

const BuyerChat = ({ sellerUsername }) => {
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:5001'); // Connect to WebSocket server

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', { sender: 'buyer', content: message, receiver: sellerUsername });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with {sellerUsername}</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default BuyerChat;
