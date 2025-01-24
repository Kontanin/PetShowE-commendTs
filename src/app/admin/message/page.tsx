'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import doGetRequest from '@/utils/doGetRequest';
import doPostRequest from '@/utils/doPostRequest';
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
interface User {
  id: string;
  name: string;
  email: string;
}

interface Message {
  id: number | null;
  senderId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  Conversation: {
    UserId: string | null;
  };
  User: {
    firstname: string | null;
    lastname: string | null;
  };
  customerId: string | null;
}

const ChatLayout: React.FC = () => {
  const { id } = UserStore();
  const [input, setInput] = useState('');
  const { id: currentUserID, firstName } = UserStore(); // Get the user ID from UserStore
  const [typing, setTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [Message, setMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message>({} as Message);
  const [ChatHistory, setChatHistory] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Message>();

  // chatMessages ควรเป็นdata
  const socketRef = useRef<Socket | null>(null);

  const Chathandle = (chat: Message) => {
    setSelectedChat(chat);
    fetchConversation();
    setMessage([]);
  };
  let room = 12;

  let componentChat = ChatHistory.map(chatid => (
    <div
      key={chatid.id}
      className={`p-2 border-b-2 cursor-pointer hover:bg-gray-200 ${
        selectedChat?.id === chatid.id ? 'bg-gray-100' : ''
      }`}
      onClick={() => Chathandle(chatid)}
    >
      <div className="flex items-center">
        <Avatar />
        <div className="ml-2">
          <div className="font-medium">{chatid.User.firstname}</div>
          <div className="text-sm text-gray-500">
            {chatid.content.length > 20
              ? `${chatid.content.substring(0, 20)}...`
              : chatid.content}
          </div>
        </div>
      </div>
    </div>
  ));

  const fetchHistory = async () => {
    try {
      const res = await doGetRequest(`/api/fetch-history`);
      console.log(res, 'fetchHistory');
      if (res.length > 0) {
        setChatHistory(res);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (socketRef) {
      socketRef.current?.emit('joinRoom', room);
      console.log(`Joined room: ${room}`);
    }
  }, [room]);

  useEffect(() => {
    if (socketRef) {
      socketRef.current?.emit('joinRoom', room);
      console.log(`Joined room: ${room}`);
    }
  }, [room]);

  // const checkNotAdmin = (selectedChat: Message) => {
  //   let userId = selectedChat.senderId;
  //   if (selectedChat.sender.name === 'admin') {
  //     userId = selectedChat.recipientId;
  //   }
  //   return userId;
  // };

  const checkNotYour = (selectedChat: Message | undefined) => {
    if (!selectedChat) return '';
    let userName = selectedChat.User.firstname;
    if (selectedChat.senderId === id) {
      userName = selectedChat.User.firstname;
    }
    return ' ' + userName;
  };
  const fetchConversation = async () => {
    if (!selectedChat?.Conversation.UserId) return;
    try {
      const res: Message[] = await doGetRequest(
        `/api/fetch-messages/${selectedChat.Conversation.UserId}`,
      );
      if (res.length > 0) {
        setMessage(res);
      }
      console.log(res, 'fetchConversation');
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let msg: Message = {
        id: null,
        senderId: currentUserID,
        content: input.trim(),
        createdAt: new Date(),
        isRead: false,
        customerId: selectedChat?.Conversation.UserId ?? null,
        Conversation: {
          UserId: null,
        },
        User: {
          firstname: null,
          lastname: null,
        },
      };
      // if (socketRef.current) {
      //   socketRef.current.emit('stop typing', checkNotAdmin(selectedChat));
      // }
      let conId = selectedChat?.Conversation.UserId;
      console.log(conId, 'conId');
      try {
        const res = await doPostRequest(
          { ...msg, conId },
          '/api/create-messages/',
        );
        console.log(res, 'res');
        // if (socketRef.current) {
        //   socketRef.current.emit('new message', data);
        // }
      } catch (error) {
        console.error('Failed to send the message:', error);
      }
    }
  };

  // useEffect(() => {
  //   if (!socketRef.current) return;

  //   socketRef.current.on('message received', newMessageReceived => {
  //     if (selectedChat.id !== newMessageReceived.chatId) {
  //       console.warn('Received message for a different chat');
  //     } else {
  //       chatMessages.current = [...chatMessages.current, newMessageReceived];
  //     }
  //   });

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.off('message received');
  //     }
  //   };
  // }, [selectedChat]);

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
        <div className="mt-6">
          <div className="text-lg font-semibold">My Chats</div>
          <div className="mt-2 space-y-2">{componentChat}</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white shadow-lg">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-lg font-semibold">
            Chat with
            {checkNotYour(selectedChat)}
          </div>
          {Message.map((message, index) => {
            // Determine if the time difference between the current message and the previous one is more than 5 minutes
            const showTimestamp =
              index === 0 ||
              (message.createdAt instanceof Date &&
                Message[index - 1].createdAt instanceof Date &&
                message.createdAt.getTime() -
                  Message[index - 1].createdAt.getTime() >
                  300000);

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
                      message.senderId == id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 bg-gray-100 border-t">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(e)}
            className="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={() =>
              sendMessage({
                key: 'Enter',
              } as React.KeyboardEvent<HTMLInputElement>)
            }
            className="ml-2 bg-orange-600 text-white rounded-lg px-3 py-2 text-sm"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
