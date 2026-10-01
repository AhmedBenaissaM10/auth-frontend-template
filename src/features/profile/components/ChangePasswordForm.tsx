import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, TextField } from "@/shared/components";
import { useChangePassword } from "../hooks";
import { changePasswordSchema, type ChangePasswordValues } from "../schemas";

export function ChangePasswordForm() {
  const change = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const onSubmit = (values: ChangePasswordValues) => change.mutate(values, { onSuccess: () => reset() });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-md space-y-4">
      {change.isError && <Alert variant="danger">{getErrorMessage(change.error)}</Alert>}
      {change.isSuccess && <Alert variant="success">Password changed.</Alert>}
      <TextField
        label="Current password"
        type="password"
        autoComplete="current-password"
        error={errors.oldPassword?.message}
        {...register("oldPassword")}
      />
      <TextField
        label="New password"
        type="password"
        autoComplete="new-password"
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <Button type="submit" loading={change.isPending}>
        Change password
      </Button>
    </form>
  );
}
