import { Link } from "react-router-dom";
import { paths } from "@/app/paths";
import { buttonVariants } from "@/shared/components";
import { brand } from "@/theme/brand";

export function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{brand.name}</h1>
        <p className="mx-auto max-w-md text-muted-foreground">{brand.tagline}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to={paths.signup} className={buttonVariants({ size: "lg" })}>
          Create an account
        </Link>
        <Link to={paths.login} className={buttonVariants({ variant: "outline", size: "lg" })}>
          Log in
        </Link>
      </div>
    </main>
  );
}
