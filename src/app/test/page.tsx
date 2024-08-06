"use client"
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';



// Define the socket type with the data you expect to handle
interface AuthenticatedSocket extends Socket {
  data: {
    user: {
      id: string;
      role: string;
      iat: number;
    };
  };
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    pic: string;
  };
  content: string;
  chat: {
    _id: string;
    chatName: string;
    users: User[];
  };
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

const SOCKET_URL = 'http://localhost:5000'; // Replace with your server URL

const SingleChat: React.FC<{ selectedChat: any; user: User }> = ({ selectedChat, user }) => {
  const [socket, setSocket] = useState<AuthenticatedSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const socketConnection: AuthenticatedSocket = io(SOCKET_URL) as AuthenticatedSocket;
    console.log("try")
    setSocket(socketConnection);

    socketConnection.on('connected', () => {
      console.log('Connected to the server');
      socketConnection.emit('setup', user);
    });

    socketConnection.on('message recieved', (newMessageRecieved: Message) => {
      if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
        // Show notification if the message is from another chat

      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    });

    socketConnection.on('typing', () => setIsTyping(true));
    socketConnection.on('stop typing', () => setIsTyping(false));

    return () => {
      socketConnection.disconnect();
    };
  }, [selectedChat, user]);

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      socket?.emit('stop typing', selectedChat._id);
      setTyping(false);

      const messageToSend = {
        content: newMessage,
        chatId: selectedChat._id,
      };

      try {
        // Emitting the new message event
        socket?.emit('new message', messageToSend);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socket || !selectedChat) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg._id}>
            <span>{msg.sender.name}</span>: {msg.content}
          </div>
        ))}
      </div>
      <div>
        {isTyping ? <div>Typing...</div> : null}
        <input
          type="text"
          placeholder="Enter a message..."
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={sendMessage}
        />
      </div>
    </div>
  );
};

export default SingleChat;
