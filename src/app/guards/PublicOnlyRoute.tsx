import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "@/features/auth";
import { FullPageSpinner } from "@/shared/components";
import { paths, type RedirectState } from "@/app/paths";

/** Layout route for welcome/login/signup/reset: logged-in users are redirected away. */
export function PublicOnlyRoute() {
  const { status, user } = useSession();
  const location = useLocation();

  if (status === "loading") return <FullPageSpinner />;

  if (user) {
    const from = (location.state as RedirectState | null)?.from;
    const target = from ? `${from.pathname}${from.search ?? ""}` : paths.home;
    return <Navigate to={target} replace />;
  }

  // Includes the "error" status: the pages still render and their forms show the network error.
  return <Outlet />;
}
