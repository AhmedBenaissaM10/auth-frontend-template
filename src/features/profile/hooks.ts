import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setSessionUser } from "@/features/auth";
import { profileApi } from "./api";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileApi.update,
    // Keep the navbar and every page in sync with the saved profile.
    onSuccess: (data) => setSessionUser(queryClient, data.user),
  });
}

export function useChangePassword() {
  return useMutation({ mutationFn: profileApi.changePassword });
}
