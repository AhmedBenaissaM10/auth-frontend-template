import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage, type ProfileUpdateInput, type User } from "@/shared/api";
import { Alert, Button, TextField } from "@/shared/components";
import { useUpdateProfile } from "../hooks";
import { profileSchema, type ProfileValues } from "../schemas";

export function ProfileForm({ user }: { user: User }) {
  const update = useUpdateProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, email: user.email },
  });

  const onSubmit = (values: ProfileValues) => {
    // The backend updates only the fields it receives, so send only what changed.
    const changes: ProfileUpdateInput = {};
    if (values.name !== user.name) changes.name = values.name;
    if (values.email !== user.email) changes.email = values.email;
    if (Object.keys(changes).length === 0) return;

    update.mutate(changes, {
      onSuccess: (data) => reset({ name: data.user.name, email: data.user.email }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-md space-y-4">
      {update.isError && <Alert variant="danger">{getErrorMessage(update.error)}</Alert>}
      {update.isSuccess && !isDirty && <Alert variant="success">Profile updated.</Alert>}
      <TextField label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <Button type="submit" loading={update.isPending} disabled={!isDirty}>
        Save changes
      </Button>
    </form>
  );
}
