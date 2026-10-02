import { api, request, type PaginationMeta } from "@/shared/api";
import type { Item, ItemInput } from "./types";

export const itemsApi = {
  /** Use `request` (not `api.get`) when you also need the response `meta` for pagination. */
  async list(page: number, limit = 10): Promise<{ items: Item[]; meta?: PaginationMeta }> {
    const response = await request<{ items: Item[] }>("/items", { query: { page, limit } });
    return { items: response.data.items, meta: response.meta };
  },
  create: (input: ItemInput) => api.post<{ item: Item }>("/items", input),
  remove: (id: string) => api.delete<null>(`/items/${id}`),
};
