// utils/schemas.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
