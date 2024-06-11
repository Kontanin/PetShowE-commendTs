export enum PromotionType {
  Discount = 'Discount',
  FreeShipping = 'FreeShipping',
}

export interface Promotion {
  id: number;
  name: string;
  type: PromotionType;
  targets: string[]; // Array of product IDs
  percentage?: number; // Optional because it is only needed for Discount promotions
  startDate: string;
  endDate: string;
}

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
