export interface Product {
    id: string;
    productName: string;
    description: string;
    stock: number;
    unitPrice: number;
    image: string;
    freeShipping: boolean;
    company: string;
    category: string;
    tag: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }