import { z } from 'zod';

export const step1Schema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
});

export const step2Schema = z.object({
  address: z.string().optional(),
  subdistrict: z.string().optional(),
  country: z.string().optional(),
  zipcode: z.number().optional(),
});

export const step3Schema = z.object({
  email: z.string().email('This is not a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type Step1Errors = z.infer<typeof step1Schema>;
export type Step2Errors = z.infer<typeof step2Schema>;
export type Step3Errors = z.infer<typeof step3Schema>;
