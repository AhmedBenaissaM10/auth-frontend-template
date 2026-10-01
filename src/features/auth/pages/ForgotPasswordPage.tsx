import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/app/paths";
import { buttonVariants, textLink } from "@/shared/components";
import { AuthLayout } from "../components/AuthLayout";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

type Step = { name: "request" } | { name: "reset"; email: string; notice?: string } | { name: "done" };

const backToLogin = (
  <Link to={paths.login} className={textLink}>
    Back to log in
  </Link>
);

export function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>({ name: "request" });

  if (step.name === "done") {
    return (
      <AuthLayout title="Password updated" description="You can now log in with your new password.">
        <Link to={paths.login} className={`${buttonVariants()} w-full`}>
          Go to log in
        </Link>
      </AuthLayout>
    );
  }

  if (step.name === "reset") {
    return (
      <AuthLayout
        title="Enter the code"
        description={`If an account exists for ${step.email}, we sent a 6-digit code to it.`}
        footer={backToLogin}
      >
        <ResetPasswordForm
          email={step.email}
          notice={step.notice}
          onDone={() => setStep({ name: "done" })}
          onResent={() => setStep({ ...step, notice: "A new code was sent if the account exists." })}
          onChangeEmail={() => setStep({ name: "request" })}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email and we'll send you a 6-digit code."
      footer={backToLogin}
    >
      <ForgotPasswordForm onSent={(email) => setStep({ name: "reset", email })} />
    </AuthLayout>
  );
}
