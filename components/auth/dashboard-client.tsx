"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist-form";
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
      <div className="flex min-h-[100svh] items-center justify-center bg-zinc-950">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
      </div>
    );
  }

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  return (
    <div className="min-h-[100svh] bg-zinc-950 text-white">
      <header className="border-b border-zinc-800/80">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpeg"
              alt="Big Film Fund"
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium">Big Film Fund</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-zinc-500 sm:inline">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="h-8 rounded-lg border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <p className="text-sm text-zinc-500">Signed in as</p>
          <h1 className="mt-1 text-2xl font-normal tracking-tight text-white sm:text-3xl">
            {displayName}
          </h1>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
              <Mail className="h-4 w-4 text-zinc-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">
                Platform is non functional right now
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Join the waitlist to get notified on our launch.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-800 pt-8">
            <WaitlistForm />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400">
            ← Back to homepage
          </Link>
        </p>
      </main>
    </div>
  );
}
