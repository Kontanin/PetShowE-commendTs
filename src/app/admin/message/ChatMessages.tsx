import React, { useState } from 'react';
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
const ChatMessages: React.FC<{ messages: Message[]; userId: string }> = ({
  messages,
  userId,
}) => {
  if (messages.length > 0) {
    return (
      <>
        {messages.map((message, index) => {
          // Determine if the time difference between the current message and the previous one is more than 5 minutes
          const showTimestamp =
            index === 0 ||
            (message.createdAt instanceof Date &&
              messages[index - 1].createdAt instanceof Date &&
              message.createdAt.getTime() -
                messages[index - 1].createdAt.getTime() >
                300000);

          return (
            <div key={message.id} className="flex flex-col items-center mb-2">
              {showTimestamp && (
                <span className="text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              )}
              <div
                className={`flex w-full ${message.senderId == userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow-md ${message.senderId == userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return <div className="text-center">No messages yet</div>;
};

export default ChatMessages;
