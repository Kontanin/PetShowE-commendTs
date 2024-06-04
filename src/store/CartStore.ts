// types.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


export interface Product {
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

export interface CartStore {
    cart: Product[];
    addToCart: (product: Product) => void;
    createOrder: () => Promise<void>;
    clearCart: () => void;
  }
  
  // Create the store with persist middleware
  export const CartStore = create(
    persist<CartStore>(
      (set) => ({
        cart: [],
        addToCart: (product: Product) => {
          set(state => {
            // Check if the product already exists in the cart
            const existingProductIndex = state.cart.findIndex(
              item => item.id === product.id
            );
  
            if (existingProductIndex > -1) {
              // Product exists, increment the quantity
              const updatedCart = state.cart.map((item, index) =>
                index === existingProductIndex
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item
              );
              return { cart: updatedCart };
            } else {
              // Product does not exist, add to cart
              return { cart: [...state.cart, product] };
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
  