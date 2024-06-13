export enum PromotionType {
  Discount = 'Discount',
  FreeShipping = 'FreeShipping',
}

export interface Promotion {
  id: string;
  name: string;
  type: PromotionType;
  description: string;
  targets: string[];
  percentage?: number;
  startDate: string;
  endDate: string;
}
