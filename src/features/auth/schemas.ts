import { z } from "zod";

// Only rules the backend defines (6-digit code) plus basic "not empty" and email format.
// Password strength rules come from the backend's own validation message.
const email = z.string().trim().min(1, "Enter your email").email("Enter a valid email address");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email,
  password: z.string().min(1, "Choose a password"),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
  newPassword: z.string().min(1, "Choose a new password"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
