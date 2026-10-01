import { useId, useState, type ComponentProps } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  hint?: string;
}

/** Label + input + error/hint. Works with react-hook-form's register(). Password fields get a show/hide toggle. */
export function TextField({ label, error, hint, id, type, className = "", ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && visible ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={
            "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm " +
            "placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring " +
            "disabled:opacity-60 aria-[invalid=true]:border-danger " +
            `${isPassword ? "pr-16 " : ""}${className}`
          }
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 px-3 text-xs text-muted-foreground hover:text-foreground"
          >
            {visible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error ? (
        <p id={messageId} className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
