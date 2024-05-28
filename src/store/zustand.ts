import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type HeaderStore = {
  goBackUrl: string;
  setGoBackUrl: (url: string) => void;
  setHeader: (header: string) => void;
  setWidth: (width: string) => void;
  widthWindow: number;
};

export enum headerType {
  NORMAL_STATE,
  OPEN_FILLTER,
  GOBACK_STATE,
}

type UserTypes = {
  email: string;
  password: string;
  id: string;
  username: string;
};

type USerstrore = {
  id: string;
  role: string;
  setUSer: (user: UserTypes) => void;
};

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Profile {
  email: string;
  avatarUrl: string;
  roles: string[];
}

interface AppData {
  cartItems: Product[];
  favorites: Product[];
  searchHistory: string[];
}
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartOrder {
  cart: Product[];
  setCart: (cart: Product[]) => void;
}

// Create the store with persist middleware
export const useCartStore = create(
  persist<CartOrder>(
    set => ({
      cart: [],
      setCart: (cart: Product[]) => {
        set({ cart });
      },
    }),
    {
      name: 'cartStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useUserStore = create(
  persist<USerstrore>(
    (set, get) => ({
      id: '',
      role: '',
      setUSer: (user: UserTypes) => {
        set({ id: user.id, role: user.id });
      },
    }),
    { getStorage: () => localStorage, name: 'userStore' },
  ),
);
