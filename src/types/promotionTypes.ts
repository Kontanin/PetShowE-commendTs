// src/types/promotionTypes.ts
export enum PromotionType {
  Discount = 'Discount',
  FreeShipping = 'FreeShipping',
}

export interface Promotion {
  id: number;
  name: string;
  type: PromotionType;
  targets: string[];
  percentage?: number;
  startDate: string;
  endDate: string;
}
