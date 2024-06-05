import { z } from 'zod';

export const step1Schema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
});

export const step2Schema = z.object({
  address: z.string().optional(),
  subdistrict: z.string().optional(),
  country: z.string().optional(),
  zipcode: z.number().optional(),  // Ensure zipcode is a number
});

export const step3Schema = z.object({
  email: z.string().email('This is not a valid email.'), // Custom email error message
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
