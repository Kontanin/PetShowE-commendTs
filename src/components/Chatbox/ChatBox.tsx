'use client';

import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import classNames from 'classnames';
import { UserStore } from '@/store/UserStore';
import Cookies from 'js-cookie';

const endpoint = 'http://localhost:5000';

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

const ChatBox: React.FC = () => {
  const { id: currentUserID } = UserStore(); // Get the user ID from UserStore
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [offset, setOffset] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessageCount, setNewMessageCount] = useState(0);

  const disconnectSocket = () => {
    if (socket) {
      // ยกเลิกการสมัครรับฟังเหตุการณ์ก่อน
      socket.off('connect_error');
      socket.off('error');
      socket.off('previousMessages');
      socket.off('new-message');
      socket.disconnect();
      console.log('Socket disconnected');
    }
  };

  useEffect(() => {
    const token = Cookies.get('authToken') || 'default_token'; // Use a default value or handle token retrieval more robustly
    const socketInstance = initializeSocket(token);

    // Error handling
    socketInstance.on('connect_error', error => {
      console.error('Connection error:', error);
    });

    // Handle new chat messages
    socketInstance.on('new-message', (msg: Message) => {
      setMessages(prevMessages => [msg, ...prevMessages]);
      if (!isOpen) {
        setNewMessageCount(prevCount => prevCount + 1);
      }
    });

    // Mock the notification count initialization
    setNewMessageCount(2);

    setSocket(socketInstance);

    window.addEventListener('beforeunload', disconnectSocket);

    return () => {
      window.removeEventListener('beforeunload', disconnectSocket);
      disconnectSocket();
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setNewMessageCount(0);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && socket) {
      const newMessage: Message = {
        userId: currentUserID, // Use the user ID from UserStore
        content: input,
        user: null,
        createdAt: new Date().toISOString(),
      };
      socket.emit('sent-message', newMessage, (error?: string) => {
        if (error) {
          console.error('Send message error:', error);
        }
      });
      setInput('');
    }
  };

  const loadMoreMessages = () => {
    const newOffset = offset + 100;
    setOffset(newOffset);
    if (socket) {
      socket.emit(
        'load-more-messages',
        { offset: newOffset },
        (error?: string) => {
          if (error) {
            console.error('Load more messages error:', error);
          }
        },
      );
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
              <button onClick={loadMoreMessages} className="text-blue-500">
                Load More Messages
              </button>
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
