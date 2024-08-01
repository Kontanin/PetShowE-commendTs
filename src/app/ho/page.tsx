'use client';
import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

const ChatLayout: React.FC = () => {
  const data: Chat[] = [
    { id: 1, name: 'John Doe', lastMessage: 'Let\'s meet someday' },
    { id: 2, name: 'Testing', lastMessage: 'Yo guys, All good?' },
    { id: 3, name: 'Friends 2', lastMessage: 'Piyush: Hi' },
  ];
  interface ChatDetail {
    id: number;
    participants: string[];
    messages: Message[];
  }
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [chats,setchat] = useState<Chat[]>(data);
  const [chatHistory]=useState({})
  const [selectedChat, setSelectedChat] = useState<ChatDetail | null>(null);
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white shadow-lg p-4">
        <Input 
          fullWidth
          color="primary"
          size="md"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mt-6">
          <div className="text-lg font-semibold">My Chats</div>
          <div className="mt-2 space-y-2">
            {filteredChats.map(chat => (
              <div key={chat.id} className="p-2 border-b-2 cursor-pointer hover:bg-gray-200">
                <div className="font-medium" key={chat.id+chat.name}>{chat.name}</div>
                <div className="text-sm text-gray-500">{chat.lastMessage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white shadow-lg p-4">
        <div className="flex items-center justify-center h-full text-center text-gray-500">
          Click on a user to start chatting
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
