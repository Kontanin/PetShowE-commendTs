'use client';
import React, { useEffect, useState } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { endpoint } from '@/components/Chatbox/Chatbox';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

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
  {
    id: 1,
    content: "Hey, how's it going?",
    createdAt: '2024-08-01T12:34:56Z',
    senderId: '1',
    recipientId: '2',
    isRead: false,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    recipient: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  },
  {
    id: 2,
    content: "I'm good, thanks for asking!",
    createdAt: '2024-08-01T12:35:30Z',
    senderId: '2',
    recipientId: '1',
    isRead: true,
    sender: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    recipient: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  {
    id: 3,
    content: 'Are you free for a call later?',
    createdAt: '2024-08-01T13:00:00Z',
    senderId: '1',
    recipientId: '2',
    isRead: false,
    sender: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    recipient: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  },
];

const ChatLayout: React.FC = () => {
  const { id } = UserStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<Message>(chats[0]);
  const [chatMessages, setChatMessages] = useState<Message[]>([selectedChat]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

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
          Authorization: `Bearer `,
        },
      });
      setChatMessages(data);
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newMessage) {
      if (socket) socket.emit('stop typing', checkNotAdmin(selectedChat));
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
              Authorization: `Bearer `,
            },
          }
        );
        if (socket) socket.emit('new message', data);
        setChatMessages([...chatMessages, data]);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send the message:', error);
        toast.error('Failed to send the message');
      }
    }
  };

  useEffect(() => {
    const socketInstance = io(endpoint);
    socketInstance.emit('setup', id);
    socketInstance.on('connected', () => console.log('Connected to socket'));
    socketInstance.on('typing', () => console.log('Typing...'));
    socketInstance.on('stop typing', () => console.log('Stopped typing'));
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message received', newMessageReceived => {
      if (selectedChat.id !== newMessageReceived.chatId) {
        console.warn('Received message for a different chat');
      } else {
        setChatMessages(prevMessages => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off('message received');
    };
  }, [socket, selectedChat]);

  return (
    <div className="flex h-[52rem]">
      <div className="w-1/4 bg-white shadow-lg p-4">
        <div className="p-1">
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/admin">admin</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {' '}
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
          {chatMessages.map(message => (
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
