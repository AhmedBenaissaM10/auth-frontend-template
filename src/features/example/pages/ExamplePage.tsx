// REFERENCE ONLY: not registered in the router. See ../README.md.
import { useState } from "react";
import { getErrorMessage } from "@/shared/api";
import { Alert, Button, Card, Spinner } from "@/shared/components";
import { ItemForm } from "../components/ItemForm";
import { useDeleteItem, useItems } from "../hooks";

export function ExamplePage() {
  const [page, setPage] = useState(1);
  const items = useItems(page);
  const remove = useDeleteItem();

  return (
    <>
      <h1 className="text-2xl font-semibold">Items</h1>

      <Card title="Add an item">
        <ItemForm />
      </Card>

      <Card title="Your items">
        {remove.isError && <Alert variant="danger">{getErrorMessage(remove.error)}</Alert>}

        {items.isPending ? (
          <Spinner />
        ) : items.isError ? (
          <div className="space-y-3">
            <Alert variant="danger">{getErrorMessage(items.error)}</Alert>
            <Button variant="outline" size="sm" onClick={() => items.refetch()}>
              Try again
            </Button>
          </div>
        ) : items.data.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items yet. Add your first one above.</p>
        ) : (
          <div className="space-y-4">
            <ul className={`divide-y ${items.isPlaceholderData ? "opacity-60" : ""}`}>
              {items.data.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm font-medium">{item.title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    loading={remove.isPending && remove.variables === item.id}
                    onClick={() => remove.mutate(item.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            {items.data.meta && items.data.meta.totalPages > 1 && (
              <div className="flex items-center justify-between text-sm">
                <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <span className="text-muted-foreground">
                  Page {page} of {items.data.meta.totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page >= items.data.meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </>
  );
}
