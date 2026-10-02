import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, TextField } from "@/shared/components";
import { useCreateItem } from "../hooks";
import { itemSchema, type ItemValues } from "../schemas";

export function ItemForm() {
  const create = useCreateItem();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => create.mutate(values, { onSuccess: () => reset() }))}
      noValidate
      className="max-w-md space-y-4"
    >
      {create.isError && <Alert variant="danger">{getErrorMessage(create.error)}</Alert>}
      <TextField label="Title" error={errors.title?.message} {...register("title")} />
      <Button type="submit" loading={create.isPending}>
        Add item
      </Button>
    </form>
  );
}
