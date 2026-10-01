import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, TextField } from "@/shared/components";
import { useForgotPassword, useResetPassword } from "../hooks";
import { resetPasswordSchema, type ResetPasswordValues } from "../schemas";

interface ResetPasswordFormProps {
  email: string;
  notice?: string;
  onDone: () => void;
  onResent: () => void;
  onChangeEmail: () => void;
}

/** Step 2: enter the 6-digit code and a new password. Also offers "send a new code". */
export function ResetPasswordForm({ email, notice, onDone, onResent, onChangeEmail }: ResetPasswordFormProps) {
  const reset = useResetPassword();
  const resend = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", newPassword: "" },
  });

  const onSubmit = (values: ResetPasswordValues) =>
    reset.mutate({ email, ...values }, { onSuccess: onDone });

  const resendCode = () => {
    reset.reset();
    resend.mutate({ email }, { onSuccess: onResent });
  };

  const errorMessage = reset.isError
    ? getErrorMessage(reset.error)
    : resend.isError
      ? getErrorMessage(resend.error)
      : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : notice ? <Alert>{notice}</Alert> : null}
      <TextField
        label="6-digit code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        error={errors.code?.message}
        {...register("code")}
      />
      <TextField
        label="New password"
        type="password"
        autoComplete="new-password"
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <Button type="submit" className="w-full" loading={reset.isPending}>
        Reset password
      </Button>
      <div className="flex justify-between">
        <Button variant="ghost" onClick={resendCode} loading={resend.isPending} className="px-2">
          Send a new code
        </Button>
        <Button variant="ghost" onClick={onChangeEmail} className="px-2">
          Use another email
        </Button>
      </div>
    </form>
  );
}
