'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
import io, { Socket } from 'socket.io-client';
import doGetRequest from '@/utils/doGetRequest';
import doPostRequest from '@/utils/doPostRequest';
import Cookies from 'js-cookie';
export const endpoint = 'http://localhost:5000';
import ChatMessages from './ChatMessages'; // Corrected import statement
const initializeSocket = (token: string): Socket => {
  return io(endpoint, {
    auth: { token },
  });
};
const token = Cookies.get('authToken') || 'default_token';
const socketInstance = initializeSocket(token);
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
  customerId: string | null;
  Conversation: {
    UserId: string | null;
  };
  User: {
    firstname: string | null;
    lastname: string | null;
  };
}
const ChatLayout: React.FC = () => {
  const [input, setInput] = useState('');
  const { id: currentUserID, firstName } = UserStore(); // Get the user ID from UserStore
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ChatHistory, setChatHistory] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Message>();
  const socketRef = useRef<Socket>(socketInstance);

  const chatHandle = async (chat: Message) => {
    setSelectedChat(chat);
    await fetchConversation();
  };
  let room = selectedChat?.Conversation.UserId;
  let componentChat =
    ChatHistory.length > 0 ? (
      ChatHistory.map(chatid => (
        <div
          key={chatid.id}
          className={`p-2 border-b-2 cursor-pointer hover:bg-gray-200 ${selectedChat?.id === chatid.id ? 'bg-gray-100' : ''}`}
          onClick={() => chatHandle(chatid)}
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
      ))
    ) : (
      <div> No chat now </div>
    );

  const fetchHistory = async () => {
    try {
      const res = await doGetRequest(`/api/fetch-history`);
      console.log('fetchHistory response:', res);
      if (res.length > 0) {
        return res;
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const checkNotYour = (selectedChat: Message | undefined) => {
    if (!selectedChat) return '';
    let userName = selectedChat.User.firstname;
    if (selectedChat.senderId === currentUserID) {
      userName = selectedChat.User.firstname;
    }
    return ' ' + userName;
  };

  const fetchConversation = async () => {
    console.log(selectedChat, 'selectedChat');
    if (!selectedChat?.Conversation.UserId) return;
    try {
      const res: Message[] = await doGetRequest(
        `/api/fetch-messages/${selectedChat.Conversation.UserId}`,
      );
      if (res.length > 0) {
        setMessages(res);
      }
      console.log('fetchConversation');
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let history = await fetchHistory();
      console.log(history, 'history');
      if (history) {
        setChatHistory(history);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (ChatHistory.length > 0) {
      setSelectedChat(ChatHistory[0]);
      fetchConversation();
    }
    console.log('fetchHistory', messages[0], selectedChat, ChatHistory);
  }, [ChatHistory]);

  useEffect(() => {
    if (socketRef && selectedChat) {
      socketRef.current?.emit('joinRoom', room);
      console.log(`Joined room: ${room}`);
    }
  }, [room]);

  useEffect(() => {
    if (socketRef.current) {
      const handleNewMessage = (message: Message) => {
        if (message.senderId !== currentUserID) {
          setMessages((prevMessages: Message[]) => [...prevMessages, message]);
        }
      };

      socketRef.current.on('new-message', handleNewMessage);

      return () => {
        socketRef.current.off('new-message');
      };
    }
  }, [socketRef]);

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
      console.log(socketRef.current, 'socketRef.current');
      let conId = selectedChat?.Conversation.UserId;
      try {

        if (socketRef.current) {
          socketRef.current.emit('sendMessageToRoom', {
            roomName: room,
            message: msg,
          });
        }
      } catch (error) {
        console.error('Failed to send the message:', error);
      }
    }
  };

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
          <div className="mt-2 space-y-2">
            {ChatHistory.length > 0 ? componentChat : <div> No chat now </div>}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white shadow-lg">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-lg font-semibold">
            Chat with
            {checkNotYour(selectedChat)}
          </div>
          <ChatMessages messages={messages} userId={currentUserID} />
        </div>
        <div className="flex p-4 bg-gray-100 border-t">
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
