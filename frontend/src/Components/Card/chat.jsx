// SendMessageToSeller.jsx

import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BuyerChat = () => {
  const [message, setMessage] = useState('');

  return (
    <Container>
      <h2 className="mt-4 mb-4">Send Message to Seller</h2>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Your Message:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </InputGroup>

      <Button variant="primary" className="mr-2">
        Send Message
      </Button>

      <Button variant="success">
        Send WhatsApp Message
      </Button>
    </Container>
  );
};

export default BuyerChat;
