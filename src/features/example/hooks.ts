import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { itemsApi } from "./api";

/** Query keys start with the feature name. On logout, every key except "session" is cleared. */
export const itemKeys = {
  all: ["items"] as const,
  list: (page: number) => [...itemKeys.all, "list", page] as const,
};

export function useItems(page: number) {
  return useQuery({
    queryKey: itemKeys.list(page),
    queryFn: () => itemsApi.list(page),
    placeholderData: keepPreviousData, // keeps the old page visible while the next one loads
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: itemKeys.all }),
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemsApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: itemKeys.all }),
  });
}
