import { Logo } from "@/components/ui/logo";
import { LoginForm } from "@/components/admin/login-form";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-panel border border-border bg-card p-6 sm:p-8">
          <h1 className="font-display text-xl font-semibold text-foreground">
            Sign in to admin
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Authorized personnel only.
          </p>
          <LoginForm />
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-faint">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Protected area · sessions expire after 8 hours
        </p>
      </div>
    </div>
  );
}
