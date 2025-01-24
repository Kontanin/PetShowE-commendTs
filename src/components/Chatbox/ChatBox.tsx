'use client';

import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import classNames from 'classnames';
import { UserStore } from '@/store/UserStore';
import Cookies from 'js-cookie';
import doGetRequest from '@/utils/doGetRequest';
import doPostRequest from '@/utils/doPostRequest';

export const endpoint = 'http://localhost:5000';

const initializeSocket = (token: string): Socket => {
  return io(endpoint, {
    auth: { token },
  });
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Message {
  id: number | null;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  customerId: string;
}

interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
}

interface ChatBoxProps {
  newMessageCount: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ newMessageCount }) => {
  let j = [];
  const token = Cookies.get('authToken') || 'default_token';
  const socketInstance = initializeSocket(token);

  const { id: currentUserID, firstName } = UserStore(); // Get the user ID from UserStore
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('new-message', (msg: Message) => {
        console.log('New message:', msg);
        setMessages(prevMessages => [msg, ...prevMessages]);
      });

      if (conversationId) {
        socketInstance.emit('joinConversation', conversationId);
        console.log(`Joined conversation: ${conversationId}`);
      }
    }

    return () => {
      socketInstance.off('new-message');
    };
  }, [conversationId]);

  const fetchConversation = async () => {
    try {
      const res: Message[] = await doGetRequest(
        `/api/fetch-messages/${currentUserID}`,
      );
      if (res.length > 0) {
        setMessages(res);
      }
      console.log(messages[messages.length - 1].senderId, 'res');
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchConversation();
      console.log(currentUserID, 'currentUserID');
    }
  };

  const handleSendMessage = async () => {
    const newMessage: Message = {
      id: null,
      senderId: currentUserID,
      content: input.trim(),
      createdAt: new Date().toISOString(),
      isRead: false,
      customerId: currentUserID,
    };

    try {
      const res = await doPostRequest(
        { ...newMessage, conversationId },
        '/api/create-messages/',
      );
      if (res.status) {
        throw new Error('Failed to send message');
      }
      console.log(res.data, 'sendd');
      socketInstance.emit('sendMessageToConversation', {
        conversationId,
        message: newMessage,
      });

      setMessages(prevMessages => [newMessage, ...prevMessages]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
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
                {messages.reverse().map((message, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'p-2 rounded-lg max-w-xs break-words',
                      message.senderId === currentUserID
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
