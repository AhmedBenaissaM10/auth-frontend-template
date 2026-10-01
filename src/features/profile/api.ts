import { api, type ChangePasswordInput, type ProfileUpdateInput, type UserData } from "@/shared/api";

export const profileApi = {
  update: (input: ProfileUpdateInput) => api.patch<UserData>("/auth/profile", input),
  changePassword: (input: ChangePasswordInput) => api.post<null>("/auth/change-password", input),
};
