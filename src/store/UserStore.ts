import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import validateToken from '@/utils/validateToken'; // Adjust the import path accordingly
export type UserTypes = {
  email: string;
  password: string;
  id: string;
  username: string;
  role: string;
};

export type UserStore = {
  id: string;
  role: string;
  isAuthenticated: boolean;
  setUser: (user: UserTypes) => void;
  setIsAuthenticated: (auth: boolean) => void;
  checkToken: () => Promise<void>;
};



export interface Profile {
  email: string;
  avatarUrl: string;
  roles: string[];
}



export const UserStore = create(
  persist<UserStore>(
    (set, get) => ({
      id: '',
      role: '',
      isAuthenticated: false,
      setUser: (user: UserTypes) => {
        set({ id: user.id, role: user.role });
      },
      setIsAuthenticated: (auth: boolean) => {
        set({ isAuthenticated: auth });
      },
      checkToken: async () => {
        const isValid = await validateToken();
        set({ isAuthenticated: isValid });
      },
    }),
    { name: 'userStore', storage: createJSONStorage(() => localStorage) },
  ),
);
