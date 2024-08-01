import create from 'zustand';

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

interface ChatState {
  selectedChat: Chat | null;
  user: User | null;
  notification: Message[];
  chats: Chat[];
  setSelectedChat: (chat: Chat) => void;
  setUser: (user: User) => void;
  setNotification: (notification: Message[]) => void;
  setChats: (chats: Chat[]) => void;
}

const useChatStore = create<ChatState>((set) => ({
  selectedChat: null,
  user: null,
  notification: [],
  chats: [],
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  setUser: (user) => set({ user }),
  setNotification: (notification) => set({ notification }),
  setChats: (chats) => set({ chats }),
}));

export default useChatStore;