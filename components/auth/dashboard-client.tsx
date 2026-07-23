"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist-form";
import { BrandLogo } from "@/components/brand-logo";
import { clearSession, getSession, type AuthUser } from "@/lib/auth-store";

export function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
    setReady(true);
  }, [router]);

  const handleSignOut = () => {
    clearSession();
    router.push("/login");
  };

  if (!ready || !user) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-background">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
      </div>
    );
  }

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  return (
    <div className="noise-overlay min-h-[100svh] bg-background">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <BrandLogo size="sm" />

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="h-8 rounded-full"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <h1 className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">
            {displayName}
          </h1>
        </div>

        <div className="rounded-xl border border-foreground/10 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.02]">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-display text-lg">
                Platform is not functional right now
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                This is a demo account only. Join the waitlist to get notified
                on our launch and receive platform updates.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-foreground/10 pt-8">
            <WaitlistForm />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← Back to homepage
          </Link>
        </p>
      </main>
    </div>
  );
}
