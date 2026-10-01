import { Link } from "react-router-dom";
import { paths } from "./paths";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Link to={paths.welcome} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Go to the start page
      </Link>
    </main>
  );
}
