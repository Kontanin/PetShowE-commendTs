// src/types/PayloadTypes.ts
export interface OrderProduct {
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

export interface OrderPayload {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  tax: number;
  shippingFee: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
}
