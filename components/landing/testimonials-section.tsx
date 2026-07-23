"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const perks = [
  {
    quote:
      "Be first in line when film opportunities go live on the platform — before the general public.",
    author: "Priority Access",
    role: "Early entry",
    company: "Founders Club",
    metric: "First in line",
  },
  {
    quote:
      "Exclusive behind-the-scenes news, platform progress reports, and early slate previews.",
    author: "Insider Updates",
    role: "Behind the scenes",
    company: "Founders Club",
    metric: "VIP news feed",
  },
  {
    quote:
      "Special founding member status and recognition as we launch and grow the platform.",
    author: "Special Recognition",
    role: "Founding status",
    company: "Founders Club",
    metric: "Founder badge",
  },
  {
    quote:
      "Help influence features, film selection criteria, and community initiatives as an early believer.",
    author: "Shape the Future",
    role: "Platform input",
    company: "Founders Club",
    metric: "Your voice matters",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % perks.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activePerk = perks[activeIndex];

  return (
    <section id="founders-club" className="relative border-t border-foreground/10 py-32 lg:py-40 lg:pb-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Early Access
          </span>
          <div className="h-px flex-1 bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(perks.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <span className="mb-6 block font-mono text-sm text-muted-foreground">
              Founders Club
            </span>
            <h2 className="mb-8 font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Be an Early Believer
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
              As an early supporter and investor, you&apos;ll be part of a small
              group helping shape the future of film investing. Join the
              waitlist to hear about the exclusive perks we&apos;re preparing for
              early members.
            </p>

            <blockquote
              className={`transition-all duration-300 ${
                isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <p className="font-display text-2xl leading-snug tracking-tight text-foreground md:text-3xl">
                &ldquo;{activePerk.quote}&rdquo;
              </p>
            </blockquote>

            <div
              className={`mt-8 flex items-center gap-6 transition-all delay-100 duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
                <span className="font-display text-2xl text-foreground">
                  {activePerk.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{activePerk.author}</p>
                <p className="text-muted-foreground">{activePerk.role}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-4">
            <div
              className={`border border-foreground/10 p-8 transition-all duration-300 ${
                isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Member Perk
              </span>
              <p className="font-display text-3xl text-foreground md:text-4xl">
                {activePerk.metric}
              </p>
            </div>

            <div className="mt-8 flex gap-2">
              {perks.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-2 transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-foreground"
                      : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="mt-10 h-14 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/founders-club">
                Explore Founders Club
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
