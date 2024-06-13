import { z } from 'zod';
import { PromotionType } from '@/types/promotionTypes';

export const promotionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.nativeEnum(PromotionType),
  description: z.string().min(1, 'Description is required'),
  percentage: z.number().min(0).max(100).optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  targets: z
    .string()
    .transform((val) => val.split(',').map((item) => item.trim()))
})