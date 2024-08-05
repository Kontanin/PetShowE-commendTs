'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { endpoint } from '@/components/Chatbox/Chatbox';
import chat from './chat.json'
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
interface User {
  id: string;
  name: string;
  email: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  senderId: string;
  recipientId: string;
  isRead: boolean;
  sender: User;
  recipient: User;
}

const chats: Message[] = [
  // ข้อมูล mockup ของแชท
];

const ChatLayout: React.FC = () => {
  const { id } = UserStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<Message>(chats[0]);

  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const chatMessages = useRef<Message[]>([selectedChat]);
  const socketRef = useRef<Socket | null>(null);

  const Chathandle = (chat: Message) => {
    setSelectedChat(chat);
  };

  const filteredChats = chats.filter(chat =>
    chat.sender.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const checkNotAdmin = (selectedChat: Message) => {
    let userId = selectedChat.senderId;
    if (selectedChat.sender.name === 'admin') {
      userId = selectedChat.recipientId;
    }
    return userId;
  };

  const checkNotYour = (selectedChat: Message) => {
    let userName = selectedChat.sender.name;
    if (selectedChat.senderId === id) {
      userName = selectedChat.recipient.name;
    }
    return userName;
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const { data } = await axios.get(`/api/message/${selectedChat.id}`, {
        headers: {
          Authorization: `Bearer <your-token>`,
        },
      });
      chatMessages.current = data;
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newMessage) {
      if (socketRef.current) {
        socketRef.current.emit('stop typing', checkNotAdmin(selectedChat));
      }
      try {
        const { data } = await axios.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer <your-token>`,
            },
          }
        );
        if (socketRef.current) {
          socketRef.current.emit('new message', data);
        }
        chatMessages.current = [...chatMessages.current, data];
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send the message:', error);
      }
    }
  };

  useEffect(() => {
    const socketInstance = io(endpoint);
    socketRef.current = socketInstance;
    socketInstance.emit('setup', id);
    socketInstance.on('connected', () => setSocketConnected(true));
    socketInstance.on('typing', () => console.log('Typing...'));
    socketInstance.on('stop typing', () => console.log('Stopped typing'));

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on('message received', newMessageReceived => {
      if (selectedChat.id !== newMessageReceived.chatId) {
        console.warn('Received message for a different chat');
      } else {
        chatMessages.current = [...chatMessages.current, newMessageReceived];
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off('message received');
      }
    };
  }, [selectedChat]);

  return (
    <div className="flex h-[52rem]">
      <div className="w-1/4 bg-white shadow-lg p-4">
        <div className="p-1">
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin">admin</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/admin/orders">orders</Link>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <Input
          fullWidth
          color="primary"
          size="md"
          placeholder="Search User"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <div className="mt-6">
          <div className="text-lg font-semibold">My Chats</div>
          <div className="mt-2 space-y-2">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`p-2 border-b-2 cursor-pointer hover:bg-gray-200 ${
                  selectedChat?.id === chat.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => Chathandle(chat)}
              >
                <div className="flex items-center">
                  <Avatar />
                  <div className="ml-2">
                    <div className="font-medium">{chat.sender.name}</div>
                    <div className="text-sm text-gray-500">
                      {chat.content.length > 20
                        ? `${chat.content.substring(0, 20)}...`
                        : chat.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white shadow-lg">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-lg font-semibold">
            Chat with {checkNotYour(selectedChat)}
          </div>
          {chatMessages.current.map(message => (
            <div className="mt-4 space-y-2" key={message.id}>
              <div>
                <div className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </div>
                <div className="font-medium">{message.sender.name}</div>
                <div>{message.content}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-100 border-t">
          <Input
            fullWidth
            color="primary"
            size="md"
            placeholder="Chat here"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;