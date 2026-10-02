import { env } from "@/shared/env";
import { ApiError } from "./errors";
import type { ApiErrorBody, ApiSuccess } from "./types";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type QueryValue = string | number | boolean | undefined;

export interface RequestOptions {
  method?: Method;
  body?: unknown;
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
}

const REFRESH_PATH = "/auth/refresh-token";

/** A 401 on these paths never triggers a token refresh. */
const NO_REFRESH_PATHS = new Set([
  "/auth/login",
  "/auth/signup",
  "/auth/logout",
  "/auth/forgot-password",
  "/auth/reset-password",
  REFRESH_PATH,
]);

let refreshPromise: Promise<boolean> | null = null;
let sessionExpiredHandler: (() => void) | null = null;

/** The session layer registers a callback here to clear auth state when refresh fails. */
export function setSessionExpiredHandler(handler: (() => void) | null) {
  sessionExpiredHandler = handler;
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) params.set(key, String(value));
  }
  const qs = params.toString();
  return `${env.apiUrl}${path}${qs ? `?${qs}` : ""}`;
}

async function send(path: string, options: RequestOptions): Promise<Response> {
  const hasBody = options.body !== undefined;
  try {
    return await fetch(buildUrl(path, options.query), {
      method: options.method ?? "GET",
      credentials: "include", // required: auth lives in httpOnly cookies
      cache: "no-store", // never serve or revalidate cached API responses (avoids 304s on authenticated GETs)
      headers: {
        Accept: "application/json",
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
      body: hasBody ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError({
      message: "Unable to reach the server. Check your connection and try again.",
      status: 0,
      kind: "network",
    });
  }
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function toApiError(response: Response, body: unknown): ApiError {
  const errorBody = (body ?? {}) as Partial<ApiErrorBody>;
  return new ApiError({
    message: errorBody.message || `Request failed (${response.status})`,
    status: response.status,
    kind: errorBody.status === "error" ? "error" : "fail",
    requestId: errorBody.requestId,
  });
}

/** Only one refresh runs at a time; concurrent 401s wait for the same attempt. */
function refreshSession(): Promise<boolean> {
  refreshPromise ??= (async () => {
    try {
      const response = await send(REFRESH_PATH, { method: "POST" });
      return response.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

/** Core request: returns the full success envelope (use when you need `meta`). */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiSuccess<T>> {
  let response = await send(path, options);

  if (response.status === 401 && !NO_REFRESH_PATHS.has(path)) {
    const refreshed = await refreshSession();
    if (refreshed) {
      response = await send(path, options); // retry once
    } else {
      sessionExpiredHandler?.();
    }
  }

  const body = await parseBody(response);
  if (!response.ok) throw toApiError(response, body);
  return (body ?? { success: true, data: null }) as ApiSuccess<T>;
}

type Opts = Omit<RequestOptions, "method" | "body">;

/** Convenience wrappers that return only `data`. */
export const api = {
  get: <T>(path: string, opts?: Opts) => request<T>(path, { ...opts, method: "GET" }).then((r) => r.data),
  post: <T>(path: string, body?: unknown, opts?: Opts) =>
    request<T>(path, { ...opts, method: "POST", body }).then((r) => r.data),
  patch: <T>(path: string, body?: unknown, opts?: Opts) =>
    request<T>(path, { ...opts, method: "PATCH", body }).then((r) => r.data),
  delete: <T>(path: string, opts?: Opts) => request<T>(path, { ...opts, method: "DELETE" }).then((r) => r.data),
};
