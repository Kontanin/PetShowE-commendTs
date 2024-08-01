'use client';
import React, { useState } from 'react';
import { Input, Avatar } from '@nextui-org/react';

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

const ChatLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Default to the first chat in the filtered list or keep the last selected chat
  const [selectedChat, setSelectedChat] = useState<Message | null>(
    chats[0] || null,
  );

  const filteredChats = chats.filter(chat =>
    chat.sender.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-[52rem]">
      <div className="w-1/4 bg-white shadow-lg p-4">
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
                onClick={() => setSelectedChat(chat)}
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
          {selectedChat && (
            <div>
              <div className="text-lg font-semibold">
                Chat with {selectedChat.sender.name}
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedChat.createdAt).toLocaleString()}
                  </div>
                  <div className="font-medium">{selectedChat.sender.name}</div>
                  <div>{selectedChat.content}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-100 border-t">
          <Input fullWidth color="primary" size="md" placeholder="Chat here" />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
