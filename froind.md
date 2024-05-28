import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming you have a way to set this

  useEffect(() => {
    // Handle chat history
    socket.on('chat history', (history) => {
      console.log('Received chat history:', history);
      setMessages(history);
    });

    // Handle new chat messages
    socket.on('chat message', (msg) => {
      console.log('Received new message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat history');
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && userId) {
      socket.emit('chat message', { content: message, userId });
      setMessage('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            {msg.content} - {msg.user ? `${msg.user.firstname} ${msg.user.lastname}` : 'Anonymous'}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
