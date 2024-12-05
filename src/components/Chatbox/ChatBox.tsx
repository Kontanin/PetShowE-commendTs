'use client';

import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import classNames from 'classnames';
import { UserStore } from '@/store/UserStore';
import Cookies from 'js-cookie';
import { user } from '@nextui-org/react';

export const endpoint = 'http://localhost:5000';

const initializeSocket = (token: string): Socket => {
  return io(endpoint, {
    auth: {
      token: token,
    },
  });
};

interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface Message {
  userId: string;
  content: string;
  user: User | null;
  createdAt: string;
}

interface ChatBoxProps {
  newMessageCount: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ newMessageCount }) => {
  const token = Cookies.get('authToken') || 'default_token';
  const socketInstance = initializeSocket(token);

  const { id: currentUserID, firstName } = UserStore(); // Get the user ID from UserStore
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  socketInstance.on('new-message', (msg: Message) => {
    console.log('New message:', msg);
    setMessages(prevMessages => [msg, ...(prevMessages || [])]);
  });
  let room = 12;

  useEffect(() => {
    if (socketInstance) {
      socketInstance.emit('joinRoom', room);
      console.log(`Joined room: ${room}`);
    }
  }, [room]);

  const fetchMessages = async () => {
    try {
      let AdminUserId= await fetch
      // const res = await fetch('/api/messages');
      // const data = await res.json();
      // setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchMessages();
    }
  };

  const handleSendMessage = async () => {
    if (socketInstance) {
      const newMessage: Message = {
        userId: currentUserID,
        content: input.trim(),
        user: null,
        createdAt: new Date().toISOString(),
      };

      try {

        const resId = await fetch('/user/user-id', {
          method: 'Get',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (!res.ok) {
          throw new Error('Failed to send message');
        }
        if (!resId.ok) {
          throw new Error('not found this user');
        }
        if (room && newMessage) {
          socketInstance.emit('sendMessageToRoom', {
            roomName: room,
            message: newMessage,
          });
          setMessages([newMessage]); 
        }
        setInput('');
        setMessages(prevMessages => [newMessage, ...(prevMessages || [])]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex justify-end">
        {isOpen && (
          <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-96 flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-lg font-semibold">Chat with Admin</h2>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700"
              >
                &#10005;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="text-gray-600 text-sm flex flex-col space-y-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'p-2 rounded-lg max-w-xs break-words',
                      message.userId === currentUserID
                        ? 'bg-blue-500 text-white self-end text-right'
                        : 'bg-gray-200 text-black self-start text-left',
                    )}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-orange-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        )}
        <button
          onClick={toggleChat}
          className={`relative bg-orange-600 text-white rounded-full p-3 shadow-lg focus:outline-none ${isOpen ? 'hidden' : ''}`}
        >
          Chat with Admin
          {newMessageCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {newMessageCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
