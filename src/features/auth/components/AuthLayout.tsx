import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/app/paths";
import { brand } from "@/theme/brand";

interface AuthLayoutProps {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

/** Shared frame for every logged-out screen: brand name, a card, and a footer line. */
export function AuthLayout({ title, description, footer, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-5">
        <Link to={paths.welcome} className="block text-center text-sm font-semibold">
          {brand.name}
        </Link>
        <div className="space-y-5 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {children}
        </div>
        {footer && <p className="text-center text-sm text-muted-foreground">{footer}</p>}
      </div>
    </main>
  );
}
