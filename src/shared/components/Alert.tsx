import type { ReactNode } from "react";

type AlertVariant = "danger" | "success" | "info";

const styles: Record<AlertVariant, string> = {
  danger: "border-danger/40 bg-danger/10 text-danger",
  success: "border-success/40 bg-success/10 text-success",
  info: "bg-muted text-foreground",
};

export function Alert({ variant = "info", children }: { variant?: AlertVariant; children: ReactNode }) {
  return (
    <div role={variant === "danger" ? "alert" : "status"} className={`rounded-md border px-3 py-2 text-sm ${styles[variant]}`}>
      {children}
    </div>
  );
}
