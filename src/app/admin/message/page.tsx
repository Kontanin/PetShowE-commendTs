'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import { endpoint } from '@/components/Chatbox/Chatbox';
import chats from './chat.json'
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

console.log(parsedChats);

const ChatLayout: React.FC = () => {
  const { id } = UserStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const filteredChats = parsedChats.filter(chat =>
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
  });

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
          {chatMessages.current.map((message, index) => {
  // Determine if the time difference between the current message and the previous one is more than 5 minutes
  const showTimestamp = index === 0 || (
    message.createdAt instanceof Date &&
    chatMessages.current[index - 1].createdAt instanceof Date &&
    message.createdAt.getTime() - chatMessages.current[index - 1].createdAt.getTime() > 300000
  );
  
  return (
    <div key={message.id} className="flex flex-col items-center mb-2">
      {showTimestamp && (
        <span className="text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      )}
      <div
        className={`flex w-full ${message.senderId == id ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-xs p-3 rounded-lg shadow-md ${
            message.senderId == id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          <p>{message.content}</p>
        </div>
      </div>
    </div>
  );
})

}
        </div>
        <div className="p-4 bg-gray-100 border-t">
        <Input
  fullWidth
  color="primary"
  size="md"
  placeholder="Chat here"
  value={newMessage}
  onChange={typingHandler} // Updated to use typingHandler
  onKeyDown={sendMessage}
/>

          <Input
  fullWidth
  color="primary"
  size="md"
  placeholder="Chat here"
  value={newMessage}
  onChange={typingHandler} // Updated to use typingHandler
  onKeyDown={sendMessage}
/>

        </div>
      </div>
    </div>
  );
};

export default ChatLayout;