// utils/schemas.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

export type LoginFormInputs = z.infer<typeof LoginSchema>;
