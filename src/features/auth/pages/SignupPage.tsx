import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "@/app/paths";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, TextField, textLink } from "@/shared/components";
import { AuthLayout } from "../components/AuthLayout";
import { GoogleButton } from "../components/GoogleButton";
import { OrDivider } from "../components/OrDivider";
import { signupSchema, type SignupValues } from "../schemas";
import { useSignup } from "../session";

export function SignupPage() {
  // The backend logs the user in on signup, so PublicOnlyRoute redirects automatically on success.
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <AuthLayout
      title="Create your account"
      footer={
        <>
          Already have an account?{" "}
          <Link to={paths.login} className={textLink}>
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit((values) => signup.mutate(values))} noValidate className="space-y-4">
        {signup.isError && <Alert variant="danger">{getErrorMessage(signup.error)}</Alert>}
        <TextField label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" className="w-full" loading={signup.isPending}>
          Create account
        </Button>
      </form>
      <OrDivider />
      <GoogleButton label="Sign up with Google" />
    </AuthLayout>
  );
}
