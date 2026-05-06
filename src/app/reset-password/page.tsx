"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Eye, EyeOff, CheckCircle, ArrowLeft, ShieldAlert } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setDone(true);
        toast.success("Password reset successfully");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="w-full max-w-sm mx-auto text-center space-y-5">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <ShieldAlert className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Invalid link</h2>
          <p className="text-sm text-muted-foreground mt-1">This password reset link is invalid or has expired.</p>
        </div>
        <Button asChild className="w-full rounded-lg h-11">
          <Link href="/forgot-password">Request new link</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
        <p className="text-muted-foreground mt-1 text-sm">Create a strong password for your account</p>
      </div>

      {done ? (
        <div className="text-center space-y-5">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-medium">Password updated</p>
            <p className="text-sm text-muted-foreground mt-1">Your password has been reset successfully.</p>
          </div>
          <Button asChild className="w-full rounded-lg h-11">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-11 rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="h-11 rounded-lg"
            />
          </div>
          <Button type="submit" className="w-full h-11 rounded-lg" disabled={loading}>
            {loading ? "Resetting..." : "Reset password"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary font-medium hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Secure your account"
      subtitle="Choose a strong password to keep your account safe."
    >
      <Suspense fallback={<div className="w-full max-w-sm mx-auto text-center py-8">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
