/** Temporary page body. Each page file that uses it gets replaced in a later phase. */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
    </main>
  );
}
