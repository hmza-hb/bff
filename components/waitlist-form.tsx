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
    <div className={compact ? "" : "border border-foreground/10 p-6 sm:p-8"}>
      {!compact && (
        <>
          <h3 className="text-xl font-display">Want to tell us more?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
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
          className="h-12 flex-1 rounded-full border-foreground/20 bg-background px-5"
        />
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
        >
          {loading ? "Joining..." : "Keep Me in the Loop"}
        </Button>
      </form>

      {!compact && (
        <p className="mt-4 text-xs text-muted-foreground">
          By signing up, you agree to receive email updates from Big Film Fund.
          You can unsubscribe at any time.
        </p>
      )}
    </div>
  );
}
