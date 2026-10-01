import { createBrowserRouter } from "react-router-dom";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { SignupPage } from "@/features/auth/pages/SignupPage";
import { WelcomePage } from "@/features/auth/pages/WelcomePage";
import { HomePage } from "@/features/home/pages/HomePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { AppLayout } from "./AppLayout";
import { ProtectedRoute, PublicOnlyRoute } from "./guards";
import { NotFoundPage } from "./NotFoundPage";
import { paths } from "./paths";

export const router = createBrowserRouter([
  // Only for logged-out users
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: paths.welcome, element: <WelcomePage /> },
      { path: paths.login, element: <LoginPage /> },
      { path: paths.signup, element: <SignupPage /> },
      { path: paths.forgotPassword, element: <ForgotPasswordPage /> },
    ],
  },
  // Only for logged-in users, inside the navbar layout. Add new feature routes to the inner children.
  // Admin-only pages: add another group with <ProtectedRoute roles={["admin"]} />.
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: paths.home, element: <HomePage /> },
          { path: paths.profile, element: <ProfilePage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
