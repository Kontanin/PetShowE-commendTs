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

export interface AppData {
  cartItems: Product[];
  favorites: Product[];
  searchHistory: string[];
}