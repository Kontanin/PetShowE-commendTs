'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface Message {
  id: number;
  content: string;
  user: User | null;
  userId: string;
  createdAt: string;
}

const socket = io('http://localhost:5000');

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string>(''); // Assuming you have a way to set this

  useEffect(() => {
    // Handle chat history
    socket.on('chat history', (history: Message[]) => {
      console.log('Received chat history:', history);
      setMessages(history);
    });

    // Handle new chat messages
    socket.on('chat message', (msg: Message) => {
      console.log('Received new message:', msg);
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat history');
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message && userId) {
      console.log('messages', message, 'UserID', userId);
      socket.emit('chat message', { content: message, userId });
      setMessage('');
    }
  };

  useEffect(() => {
    // Simulate setting userId after user logs in
    setUserId('your-user-id'); // Replace with actual user ID from your authentication system
  }, []);

  return (
    <div>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            {msg.content} -{' '}
            {msg.user
              ? `${msg.user.firstname} ${msg.user.lastname}`
              : 'Anonymous'}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
