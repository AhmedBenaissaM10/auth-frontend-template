/** Types mirror docs/openapi.yaml. Update both together. */

export type Role = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Every successful response uses this envelope. */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
  requestId?: string;
}

/** Every error response uses this envelope. */
export interface ApiErrorBody {
  success: false;
  /** "fail" = validation/operational error, "error" = unexpected server error */
  status: "fail" | "error";
  message: string;
  requestId?: string;
}

/** Data shape returned by login, signup, refresh-token, and profile endpoints. */
export interface UserData {
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput extends LoginInput {
  name: string;
}

export interface ProfileUpdateInput {
  name?: string;
  email?: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  /** Exactly 6 digits */
  code: string;
  newPassword: string;
}
