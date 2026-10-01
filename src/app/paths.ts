/** Every route path in one place. Use these instead of string literals. */
export const paths = {
  welcome: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  home: "/home",
  profile: "/profile",
} as const;

/** Router state set by ProtectedRoute so login can send the user back where they came from. */
export interface RedirectState {
  from?: { pathname: string; search?: string };
}
