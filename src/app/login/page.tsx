import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AuthLayout } from "@/components/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: new Headers(),
  });

  if (session?.user) {
    redirect("/feed");
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue building and discovering amazing SaaS products."
    >
      <LoginForm />
    </AuthLayout>
  );
}
