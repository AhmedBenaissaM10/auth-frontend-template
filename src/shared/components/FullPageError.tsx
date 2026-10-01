interface FullPageErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function FullPageError({
  message = "We couldn't reach the server. Check your connection and try again.",
  onRetry,
}: FullPageErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      )}
    </div>
  );
}
