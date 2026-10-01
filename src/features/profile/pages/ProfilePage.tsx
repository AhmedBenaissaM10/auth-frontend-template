import { useSession } from "@/features/auth";
import { Card } from "@/shared/components";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { ProfileForm } from "../components/ProfileForm";

export function ProfilePage() {
  const { user } = useSession();
  if (!user) return null; // ProtectedRoute guarantees a user; this narrows the type.

  return (
    <>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Card title="Account">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="font-medium capitalize">{user.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Member since</dt>
            <dd className="font-medium">{new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}</dd>
          </div>
        </dl>
      </Card>
      <Card title="Edit profile" description="Change your name or email.">
        <ProfileForm user={user} />
      </Card>
      <Card title="Change password">
        <ChangePasswordForm />
      </Card>
    </>
  );
}
