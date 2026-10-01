import {
  api,
  type ForgotPasswordInput,
  type LoginInput,
  type ResetPasswordInput,
  type SignupInput,
  type UserData,
} from "@/shared/api";
import { env } from "@/shared/env";

export const authApi = {
  getProfile: () => api.get<UserData>("/auth/profile"),
  login: (input: LoginInput) => api.post<UserData>("/auth/login", input),
  signup: (input: SignupInput) => api.post<UserData>("/auth/signup", input),
  logout: () => api.post<null>("/auth/logout"),
  forgotPassword: (input: ForgotPasswordInput) => api.post<null>("/auth/forgot-password", input),
  resetPassword: (input: ResetPasswordInput) => api.post<null>("/auth/reset-password", input),
};

/** Google sign-in must be a full browser navigation to this URL, never a fetch call. */
export const googleLoginUrl = `${env.apiUrl}/auth/google`;
