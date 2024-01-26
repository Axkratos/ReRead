import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BuyerChat = ({ sellerUsername }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Replace with your server address
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', { sender: 'buyer', content: message, receiver: sellerUsername });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with {localStorage.getItem('User')}</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>
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
