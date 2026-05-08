import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AuthLayout } from "@/components/auth-layout";
import { SignupForm } from "@/components/auth/signup-form";

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: new Headers(),
  });

  if (session?.user) {
    redirect("/feed");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of makers launching and selling SaaS products."
    >
      <SignupForm />
    </AuthLayout>
  );
}
