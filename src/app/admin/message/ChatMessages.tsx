import React from 'react';

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
          // Determine if the time difference between the current message and the previous one is more than 3 hours
          const showTimestamp =
            index === 0 ||
            new Date(message.createdAt).getTime() -
              new Date(messages[index - 1].createdAt).getTime() >
              5 * 60 * 1000;

          return (
            <div key={message.id} className="flex flex-col items-center mb-2">
              <span className="text-xs text-gray-500">
                {showTimestamp &&
                  new Date(message.createdAt).toLocaleString(
                    [],

                    {
                      weekday: 'short', // แสดงวันแบบย่อ (เช่น Mon, Tue)
                      year: 'numeric', // ปี (4 หลัก)
                      month: 'short', // เดือน (ตัวย่อ)
                      day: '2-digit', // วัน (2 หลัก)
                    },
                  )}
              </span>
              <div
                className={`flex w-full ${message.senderId == userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`relative group max-w-xs p-3 rounded-lg shadow-md ${message.senderId == userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                  <p>{message.content}</p>

                  {/* Tooltip */}
                  <span
                    className={`  ${message.senderId == userId ? '-translate-x-4' : 'translate-x-4'}   absolute -top- left-1/2  bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit', // ชั่วโมง (00-23)
                      minute: '2-digit', // นาที (00-59)
                      hour12: false,
                    })}
                  </span>
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
