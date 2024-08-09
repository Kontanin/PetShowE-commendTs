'use client';
import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

// Define the socket type with the data you expect to handle
interface AuthenticatedSocket extends Socket {
  data: {
    user: {
      id: string;
      role: string;
      iat: number;
    };
  };
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    pic: string;
  };
  content: string;
  chat: {
    _id: string;
    chatName: string;
    users: User[];
  };
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

const SOCKET_URL = 'http://localhost:5000'; // Replace with your server URL

let socket: AuthenticatedSocket | null = null; // Declare socket at the top
let selectedChatCompare: any; // Declare selectedChatCompare at the top

const SingleChat: React.FC<{ selectedChat: any }> = ({ selectedChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const lastTypingTimeRef = useRef<number>(0); // To track the last typing time
  let user = '1';
  socket = io(SOCKET_URL) as AuthenticatedSocket;
  useEffect(() => {
    

    socket?.emit('setup', user);
    socket?.on('connected', (data) => {
      console.log("connec",data)
      setSocketConnected(true)});

    // socket.on('message recieved', (newMessageRecieved: Message) => {
    //   if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
    //     // Show notification if the message is from another chat
    //   } else {
    //     setMessages(prevMessages => [...prevMessages, newMessageRecieved]);
    //   }
    // });


    socket?.on('stop typing', () => setIsTyping(false));

  

  }, [user]);
  socket.on('typing', () => {console.log('isTyping');
    setIsTyping(true)});
  socket.on('message recieved', (newMessageRecieved) => {
    console.log("message recieved")
  });
  useEffect(() => {
    selectedChatCompare = selectedChat;
  }, []);

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      socket?.emit('stop typing', selectedChat._id);
      setTyping(false);

      const messageToSend = {
        content: newMessage,
        chatId: selectedChat._id,
      };

      try {
        // Emitting the new message event
        socket?.emit('new message', messageToSend);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socketConnected ) return;

    if (!typing) {
      setTyping(true);
      console.log("Typing")
      socket?.emit('typing', "1");
    }
    const timerLength = 3000;
    lastTypingTimeRef.current = new Date().getTime();

    // setTimeout(() => {
    //   const timeNow = new Date().getTime();
    //   const timeDiff = timeNow - lastTypingTimeRef.current;

    //   if (timeDiff >= timerLength && typing) {
    //     socket?.emit('stop typing',"1");
    //     setTyping(false);
    //   }
    // }, timerLe
    socket?.emit('stop typing',"1");
    console.log("strp")

  };

  return (
    <div>
      <div>
        {messages.map(msg => (
          <div key={msg._id}>
            <span>{msg.sender.name}</span>: {msg.content}
          </div>
        ))}
      </div>
      <div>
        {isTyping ? <div>Typing...</div> : null}
        <input
          type="text"
          placeholder="Enter a message..."
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={sendMessage}
        />
      </div>
    </div>
  );
};

export default SingleChat;
