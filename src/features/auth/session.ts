import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { isApiError, type User } from "@/shared/api";
import { authApi } from "./api";

/** The session is a single cached query: its data is the current user, or null when logged out. */
export const sessionKey = ["session"] as const;

export function setSessionUser(queryClient: QueryClient, user: User) {
  queryClient.setQueryData(sessionKey, user);
}

/** Log out locally: drop the user and every other cached query (they may hold private data). */
export function clearSession(queryClient: QueryClient) {
  queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== sessionKey[0] });
  queryClient.setQueryData(sessionKey, null);
}

export type SessionStatus = "loading" | "authenticated" | "unauthenticated" | "error";

export function useSession() {
  const query = useQuery({
    queryKey: sessionKey,
    queryFn: async (): Promise<User | null> => {
      try {
        const data = await authApi.getProfile();
        if (!data?.user) {
          throw new Error("GET /auth/profile returned no `data.user`. Compare the response with docs/openapi.yaml.");
        }
        return data.user;
      } catch (error) {
        // 401 after the silent refresh attempt means "not logged in", not a failure.
        if (isApiError(error) && error.isUnauthorized) return null;
        if (import.meta.env.DEV) console.error("[session] profile check failed:", error);
        throw error;
      }
    },
    staleTime: Infinity,
  });

  let status: SessionStatus;
  if (query.data) status = "authenticated";
  else if (query.data === null) status = "unauthenticated";
  else if (query.isError) status = "error";
  else status = "loading";

  const user = query.data ?? null;
  return { user, status, error: query.error, isAdmin: user?.role === "admin", refetch: query.refetch };
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => setSessionUser(queryClient, data.user),
  });
}

/** The backend logs the user in immediately after signup. */
export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => setSessionUser(queryClient, data.user),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => clearSession(queryClient),
    // A 401 means the session was already gone, so clear locally. A network error keeps the user logged in.
    onError: (error) => {
      if (isApiError(error) && !error.isNetwork) clearSession(queryClient);
    },
  });
}
