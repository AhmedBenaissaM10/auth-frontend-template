export type ApiErrorKind = "fail" | "error" | "network";

interface ApiErrorInit {
  message: string;
  status: number;
  kind: ApiErrorKind;
  requestId?: string;
}

export class ApiError extends Error {
  /** HTTP status code, or 0 when the server could not be reached */
  readonly status: number;
  readonly kind: ApiErrorKind;
  readonly requestId?: string;

  constructor(init: ApiErrorInit) {
    super(init.message);
    this.name = "ApiError";
    this.status = init.status;
    this.kind = init.kind;
    this.requestId = init.requestId;
  }

  get isNetwork() {
    return this.kind === "network";
  }
  get isValidation() {
    return this.status === 400;
  }
  get isUnauthorized() {
    return this.status === 401;
  }
  get isForbidden() {
    return this.status === 403;
  }
  get isNotFound() {
    return this.status === 404;
  }
  get isRateLimited() {
    return this.status === 429;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/** The single place that turns any thrown value into text for the UI. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (isApiError(error)) {
    if (error.isRateLimited) return "Too many attempts. Please wait a moment and try again.";
    return error.message || fallback;
  }
  return fallback;
}
