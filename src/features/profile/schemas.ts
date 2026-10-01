import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
});

// No strength rules here: the backend's validation message is shown if it rejects the password.
export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Enter your current password"),
  newPassword: z.string().min(1, "Enter a new password"),
});

export type ProfileValues = z.infer<typeof profileSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
