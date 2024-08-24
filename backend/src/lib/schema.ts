import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string().min(3,"min 3 characters required"),
  email: z.string().email("invalid email format"),
  password: z.string().min(8,"min 8 characters required"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});