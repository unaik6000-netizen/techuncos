import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-background px-4 text-center">
      <Logo />
      <div>
        <p className="text-gradient font-display text-7xl font-bold leading-none">
          404
        </p>
        <h1 className="mt-4 font-display text-xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-gradient px-5 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </div>
  );
}
