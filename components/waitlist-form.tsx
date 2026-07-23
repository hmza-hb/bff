"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("You're on the list!", {
      description: "We'll keep you updated on Big Film Fund launches.",
    });
    setEmail("");
  };

  return (
    <div className={compact ? "" : "glass-card rounded-2xl p-6 sm:p-8"}>
      {!compact && (
        <>
          <h3 className="text-xl font-medium text-white">
            Want to tell us more?
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your email below to join the BFF waitlist and newsletter.
          </p>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-3 ${compact ? "" : "mt-6"} sm:flex-row`}
      >
        <Input
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 flex-1 rounded-xl border-zinc-700 bg-zinc-900/80 text-white placeholder:text-zinc-500 focus-visible:ring-red-600/30"
        />
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="h-12 rounded-xl bg-white px-8 text-zinc-950 hover:bg-white/90"
        >
          {loading ? "Joining..." : "Keep Me in the Loop"}
        </Button>
      </form>

      {!compact && (
        <p className="mt-4 text-xs text-zinc-500">
          By signing up, you agree to receive email updates from Big Film Fund.
          You can unsubscribe at any time.
        </p>
      )}
    </div>
  );
}
