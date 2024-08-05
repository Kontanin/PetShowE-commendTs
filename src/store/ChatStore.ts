import { create } from 'zustand';

interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage: Message;
}

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}

interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
}

export interface ChatState {
  selectedChat: Chat | null;          // State for the currently selected chat
  user: User;                         // State for the current user
  notification: Message[];            // State for notifications
  chats: Chat[];                      // State for the list of chats
  chatMessages: Message[];            // State for the messages in the selected chat
  setSelectedChat: (chat: Chat) => void; // Function to set the selected chat
  setUser: (user: User) => void;         // Function to set the user data
  setNotification: (notification: Message[]) => void; // Function to set notifications
  setChats: (chats: Chat[]) => void;   // Function to set the list of chats
  setChatMessages: (messages: Message[]) => void; // Function to set chat messages
}

const useChatStore = create<ChatState>((set) => ({
  selectedChat: null,
  user: {  _id: "", name: "", email: "", pic: "", token: "" }, // Default user object
  notification: [],           // Initial empty array for notifications
  chats: [],                  // Initial empty array for chats
  chatMessages: [],           // Initial empty array for chat messages
  setSelectedChat: (chat) => set({ selectedChat: chat }), // Update selected chat
  setUser: (user) => set({ user }),                       // Update user data
  setNotification: (notification) => set({ notification }), // Update notifications
  setChats: (chats) => set({ chats }),                    // Update list of chats
  setChatMessages: (messages) => set({ chatMessages: messages }), // Update chat messages
}));

export default useChatStore;
