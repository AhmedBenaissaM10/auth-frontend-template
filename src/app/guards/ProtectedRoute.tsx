import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "@/features/auth";
import { isApiError, type Role } from "@/shared/api";
import { FullPageError, FullPageSpinner } from "@/shared/components";
import { paths, type RedirectState } from "@/app/paths";

interface ProtectedRouteProps {
  /** Optional: only these roles may enter (e.g. ["admin"]). Others are sent home. */
  roles?: Role[];
}

/** Layout route: renders its children only for a logged-in user. */
export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { status, user, error, refetch } = useSession();
  const location = useLocation();

  if (status === "loading") return <FullPageSpinner />;
  if (status === "error") {
    // Only a real network failure gets the generic "can't reach the server" text; otherwise show what went wrong.
    const message = isApiError(error) && error.isNetwork ? undefined : error?.message;
    return <FullPageError message={message} onRetry={() => refetch()} />;
  }
  if (!user) {
    const state: RedirectState = { from: location };
    return <Navigate to={paths.login} replace state={state} />;
  }
  if (roles && !roles.includes(user.role)) return <Navigate to={paths.home} replace />;

  return <Outlet />;
}
