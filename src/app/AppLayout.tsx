import { NavLink, Link, Outlet } from "react-router-dom";
import { useLogout, useSession } from "@/features/auth";
import { Alert, Button } from "@/shared/components";
import { getErrorMessage } from "@/shared/api";
import { brand } from "@/theme/brand";
import { paths } from "./paths";

/** Navbar links. Add an entry here when you add a new top-level page. */
const navItems = [
  { to: paths.home, label: "Home" },
  { to: paths.profile, label: "Profile" },
];

/** Frame for every logged-in page: navbar with the user's name and a logout button. */
export function AppLayout() {
  const { user } = useSession();
  const logout = useLogout();

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to={paths.home} className="font-semibold">
              {brand.name}
            </Link>
            <nav className="flex items-center gap-1" aria-label="Main">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {user && <span className="hidden text-sm text-muted-foreground sm:inline">{user.name}</span>}
            <Button variant="outline" size="sm" loading={logout.isPending} onClick={() => logout.mutate()}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
        {logout.isError && <Alert variant="danger">{getErrorMessage(logout.error)}</Alert>}
        <Outlet />
      </main>
    </div>
  );
}
