import { useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setSessionExpiredHandler } from "@/shared/api";
import { clearSession } from "./session";

/** Connects the API client to the session: when a token refresh fails, the user is logged out locally. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    setSessionExpiredHandler(() => clearSession(queryClient));
    return () => setSessionExpiredHandler(null);
  }, [queryClient]);

  return <>{children}</>;
}
