import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "@/app/paths";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, TextField, textLink } from "@/shared/components";
import { AuthLayout } from "../components/AuthLayout";
import { GoogleButton } from "../components/GoogleButton";
import { OrDivider } from "../components/OrDivider";
import { loginSchema, type LoginValues } from "../schemas";
import { useLogin } from "../session";

export function LoginPage() {
  // On success the session updates and PublicOnlyRoute redirects, so no manual navigation here.
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <AuthLayout
      title="Log in"
      description="Use your email and password."
      footer={
        <>
          New here?{" "}
          <Link to={paths.signup} className={textLink}>
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit((values) => login.mutate(values))} noValidate className="space-y-4">
        {login.isError && <Alert variant="danger">{getErrorMessage(login.error)}</Alert>}
        <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <div className="space-y-1.5">
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="text-right text-sm">
            <Link to={paths.forgotPassword} className={textLink}>
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" className="w-full" loading={login.isPending}>
          Log in
        </Button>
      </form>
      <OrDivider />
      <GoogleButton />
    </AuthLayout>
  );
}
