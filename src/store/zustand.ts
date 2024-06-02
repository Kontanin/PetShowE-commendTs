import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import validateToken from '@/utils/validateToken'; // Adjust the import path accordingly





type UserTypes = {
  email: string;
  password: string;
  id: string;
  username: string;
  role: string; // Add this line
};

type UserStore = {
  id: string;
  role: string;
  isAuthenticated: boolean;
  setUser: (user: UserTypes) => void;
  setIsAuthenticated: (auth: boolean) => void;
  checkToken: () => Promise<void>;
};

interface Product {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  image: string;
  freeShipping: boolean;
  company: string;
  category: string;
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


interface StoreState {
  cart: Product[];
  addToCart: (product: Product) => void;
  createOrder: () => Promise<void>;
  clearCart: () => void;
}
// Create the store with persist middleware
export const StoreState = create(
  persist<StoreState>(
    set => ({
      cart: [],
      addToCart: (newProduct: Product) => {
        set(state => {
          // Check if the product already exists in the cart
          const existingProductIndex = state.cart.findIndex(
            item => item.id === newProduct.id
          );

          if (existingProductIndex > -1) {
            // Product exists, increment the quantity
            const updatedCart = state.cart.map((item, index) =>
              index === existingProductIndex
                ? { ...item, quantity: item.quantity + newProduct.quantity }
                : item
            );
            return { cart: updatedCart };
          } else {
            // Product does not exist, add to cart
            return { cart: [...state.cart, newProduct] };
          }
        });
      },
      createOrder: async () => {},
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'cartStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useUserStore = create(
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
