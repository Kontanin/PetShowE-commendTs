'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';

import chats from '@/data/chat.json';

// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
interface User {
  id: string;
  name: string;
  email: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: Date;
  senderId: string;
  recipientId: string;
  isRead: boolean;
  sender: User;
  recipient: User;
}

const parsedChats: Message[] = chats.map(chat => ({
  ...chat,
  createdAt: new Date(chat.createdAt), // Convert createdAt to Date
}));

const endpoint = 'http://localhost:5000';
const ChatLayout: React.FC = () => {
  const { id } = UserStore();

  const [selectedChat, setSelectedChat] = useState<Message>(parsedChats[0]);
  const [typing, setTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const chatMessages = useRef<Message[]>(parsedChats);
  // chatMessages ควรเป็นdata
  const socketRef = useRef<Socket | null>(null);

  const Chathandle = (chat: Message) => {
    setSelectedChat(chat);
  };

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
  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socketRef.current?.emit('typing', selectedChat.id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socketRef.current?.emit('stop typing', selectedChat.id);
        setTyping(false);
      }
    }, timerLength);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      // const { data } = await axios.get(`/api/message/${selectedChat.id}`, {
      //   headers: {
      //     Authorization: `Bearer <your-token>`,
      //   },
      // });
      // chatMessages.current = data;
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
        // const { data } = await axios.post(
        //   '/api/message',
        //   {
        //     content: newMessage,
        //     chatId: selectedChat.id,
        //   },
        //   {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: `Bearer <your-token>`,
        //     },
        //   },
        // );
        // if (socketRef.current) {
        //   socketRef.current.emit('new message', data);
        // }
        // chatMessages.current = [...chatMessages.current, data];
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

  // useEffect(() => {
  //   fetchMessages();
  // });

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
      <div className="p-4 bg-gray-100 border-t">qwer</div>
    </div>
  );
};

export default ChatLayout;
