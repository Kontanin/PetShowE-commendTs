'use client';
import React, { useEffect, useId, useState } from 'react';
import { Input, Avatar } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
import { UserStore } from '@/store/UserStore';
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

const Johnhistory: Message[] = [
  {
    id: 1,
    content: "Hey, how's it going?",
    createdAt: '2024-08-01T12:34:56Z',
    senderId: '1',
    recipientId: '2',
    isRead: false,
    sender: {
      id: '1',
      name: 'admin',
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
      name: 'admin',
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
      name: 'admin',
      email: 'john.doe@example.com',
    },
    recipient: {
      id: '5',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  },
];

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
      id: '5',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  },
];
const ChatLayout: React.FC = () => {
  const { id } = UserStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  

  // Default to the first chat in the filtered list or keep the last selected chat
  const [selectedChat, setSelectedChat] = useState<Message >(
    chats[0],
  );
  const [chatMessage, setChatMessage] = useState<Message[]>([selectedChat])
  const Chathandle= (chat:Message )=>{
    setSelectedChat(chat)
  }

  const filteredChats = chats.filter(chat =>
    chat.sender.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const checkNotAdmin=(selectedChat:Message)=>{
    let  userId=selectedChat.senderId
    if (selectedChat.sender.name="admin") {
      userId=selectedChat.recipientId
    }
    return JSON.parse(userId);
  }
  const checkNotYour=(selectedChat:Message)=>{
    let userName=selectedChat.sender.name
    if (selectedChat.senderId=id) {
      userName=selectedChat.recipient.name
    }

    return userName;
  }


  // const fetchMessages = async () => {
  //   if (!selectedChat) return;

  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     setLoading(true);

  //     const { data } = await axios.get(
  //       `/api/message/${selectedChat._id}`,
  //       config
  //     );
  //     setMessages(data);
  //     setLoading(false);

  //     socket.emit("join chat", selectedChat._id);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Failed to Load the Messages",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }
  // };

  // const sendMessage = async (event) => {
  //   if (event.key === "Enter" && newMessage) {
  //     socket.emit("stop typing", selectedChat._id);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       };
  //       setNewMessage("");
  //       const { data } = await axios.post(
  //         "/api/message",
  //         {
  //           content: newMessage,
  //           chatId: selectedChat,
  //         },
  //         config
  //       );
  //       socket.emit("new message", data);
  //       setMessages([...messages, data]);
  //     } catch (error) {
  //       toast({
  //         title: "Error Occured!",
  //         description: "Failed to send the Message",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.on("typing", () => setIsTyping(true));
  //   socket.on("stop typing", () => setIsTyping(false));

  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   fetchMessages();

  //   selectedChatCompare = selectedChat;
  //   // eslint-disable-next-line
  // }, [selectedChat]);

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //       if (!notification.includes(newMessageRecieved)) {
  //         setNotification([newMessageRecieved, ...notification]);
  //         setFetchAgain(!fetchAgain);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });
  useEffect(() => {
    let newid = checkNotAdmin(selectedChat);
  
    fetch(`/api/data${newid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setChatMessage(data);
        } else {
          // Handle the case where data is null or undefined
          console.warn('Received null or undefined data');
          setChatMessage([]); // or set to an empty array or appropriate default
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // Handle the error by showing an error message or setting state
        setChatMessage([]); // or set to an empty array or appropriate default
      });
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
              {' '}
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
          {chatMessage.map(message=>(
            <div className="mt-4 space-y-2" key={message.id}>
            <div>
              <div className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </div>
              <div className="font-medium">{message.sender.name}</div>
              <div>{message.content}</div>
            </div>
          </div>
          ))}
        </div>
        <div className="p-4 bg-gray-100 border-t">
          <Input fullWidth color="primary" size="md" placeholder="Chat here" />
        </div>


      </div>
    </div>
  );
};

export default ChatLayout;
