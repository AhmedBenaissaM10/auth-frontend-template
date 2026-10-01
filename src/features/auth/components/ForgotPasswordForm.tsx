import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, TextField } from "@/shared/components";
import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../schemas";

/** Step 1: ask for the email. The backend sends a 6-digit code. */
export function ForgotPasswordForm({ onSent }: { onSent: (email: string) => void }) {
  const forgot = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotPasswordValues) =>
    forgot.mutate(values, { onSuccess: () => onSent(values.email) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {forgot.isError && <Alert variant="danger">{getErrorMessage(forgot.error)}</Alert>}
      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <Button type="submit" className="w-full" loading={forgot.isPending}>
        Send code
      </Button>
    </form>
  );
}
