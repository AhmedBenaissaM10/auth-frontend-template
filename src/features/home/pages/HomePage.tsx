import { useSession } from "@/features/auth";
import { Card } from "@/shared/components";

export function HomePage() {
  const { user } = useSession();

  return (
    <>
      <h1 className="text-2xl font-semibold">Hi, {user?.name}</h1>
      <Card title="Your home page">
        <p className="text-sm text-muted-foreground">
          This is a starting point. Replace it with the main screen of your project.
        </p>
      </Card>
    </>
  );
}
