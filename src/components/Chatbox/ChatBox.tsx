// 'use client';

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import classNames from 'classnames';

// const socket = io('http://localhost:5000');

// interface User {
//   id: string;
//   firstname: string;
//   lastname: string;
// }

// interface Message {
//   id: number;
//   content: string;
//   user: User | null;
//   userId: string;
//   createdAt: string;
// }

// const ChatBox: React.FC = () => {
//   const currentUserID = 'user123'; // Replace with the actual logged-in user ID
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     // Handle chat history
//     socket.on('chat history', (history: Message[]) => {
//       console.log('Received chat history:', history);
//       setMessages(history);
//     });

//     // Handle new chat messages
//     socket.on('chat message', (msg: Message) => {
//       console.log('Received new message:', msg);
//       setMessages(prevMessages => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off('chat history');
//       socket.off('chat message');
//     };
//   }, []);

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSendMessage = () => {
//     if (input.trim()) {
//       const newMessage: Message = {
//         id: Date.now(),
//         content: input,
//         user: null,
//         userId: currentUserID,
//         createdAt: new Date().toISOString(),
//       };
//       socket.emit('chat message', newMessage);
//       setMessages([...messages, newMessage]);
//       setInput('');
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <div className="flex justify-end">
//         {isOpen && (
//           <div className="bg-white shadow-lg rounded-lg p-4 w-80 h-96 flex flex-col">
//             <div className="flex justify-between items-center border-b pb-2 mb-2">
//               <h2 className="text-lg font-semibold">Chat</h2>
//               <button
//                 onClick={toggleChat}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &#10005;
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto">
//               <div className="text-gray-600 text-sm flex flex-col space-y-2">
//                 {messages.map(message => (
//                   <div
//                     key={message.id}
//                     className={classNames(
//                       'p-2 rounded-lg max-w-xs',
//                       message.userId === currentUserID
//                         ? 'bg-blue-500 text-white self-end'
//                         : 'bg-gray-200 text-black self-start',
//                     )}
//                     style={{
//                       wordWrap: 'break-word',
//                       textAlign:
//                         message.userId === currentUserID ? 'right' : 'left',
//                     }}
//                   >
//                     {message.content}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="mt-2 flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
//                 className="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="ml-2 bg-blue-500 text-white rounded-lg px-3 py-2 hover:bg-blue-600 text-sm"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         )}
//         <button
//           onClick={toggleChat}
//           className={`bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none ${isOpen ? 'hidden' : ''}`}
//         >
//           Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
