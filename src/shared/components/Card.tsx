import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function Card({ title, description, className = "", children }: CardProps) {
  return (
    <section className={`rounded-xl border bg-card p-6 text-card-foreground shadow-sm ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
