import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeader } from "@/components/landing/section-header";
import { Button } from "@/components/ui/button";
import {
  Compass,
  TrendingUp,
  BarChart3,
  Shield,
  DollarSign,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "What is BFF | Big Film Fund",
  description:
    "Discover how Big Film Fund makes Hollywood film investing simple, transparent, and accessible to everyday investors.",
};

const steps = [
  {
    icon: Compass,
    title: "Discover",
    description:
      "Explore upcoming film opportunities on a clean, easy-to-use platform.",
  },
  {
    icon: TrendingUp,
    title: "Invest",
    description:
      "Choose the films you believe in, and buy a real share in the action.",
  },
  {
    icon: BarChart3,
    title: "Track",
    description:
      "Get updates, enjoy special perks, and share in the profits — because you're not just watching, you're an owner.",
  },
];

const pillars = [
  {
    icon: Shield,
    title: "Regulated & Compliant",
    description:
      "All offerings made through SEC-regulated crowdfunding portals with full investor protections.",
  },
  {
    icon: DollarSign,
    title: "Starting at $100",
    description:
      "Low minimums designed so everyday investors can participate in Hollywood's upside.",
  },
  {
    icon: Users,
    title: "VIP Investor Perks",
    description:
      "Premiere access, behind-the-scenes updates, and exclusive experiences for film stakeholders.",
  },
];

const films = [
  {
    title: "Midnight Protocol",
    genre: "Sci-Fi Thriller",
    status: "Pre-Production",
    minInvestment: "$100",
    targetRaise: "$2.5M",
  },
  {
    title: "The Last Reel",
    genre: "Drama",
    status: "In Development",
    minInvestment: "$250",
    targetRaise: "$1.8M",
  },
  {
    title: "Neon Crossroads",
    genre: "Action",
    status: "Casting",
    minInvestment: "$100",
    targetRaise: "$4.2M",
  },
  {
    title: "Echoes of Tomorrow",
    genre: "Documentary",
    status: "Funding Open",
    minInvestment: "$100",
    targetRaise: "$950K",
  },
];

export default function WhatIsBffPage() {
  return (
    <SiteShell>
      <PageHero
        badge="What is BFF"
        title="Film Investing Made Simple"
        subtitle="Big Film Fund gives everyday people the chance to invest in real Hollywood films, and share in the potential upside as those films earn."
      >
        <Button
          asChild
          size="lg"
          className="h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
        >
          <Link href="/#waitlist">Join the Waitlist</Link>
        </Button>
      </PageHero>

      <section className="border-y border-foreground/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            badge="How It Works"
            title="Three Steps to Ownership"
            description="We carefully evaluate each opportunity, offer investments starting from $100, and give you VIP-level access and perks along the way."
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group border border-foreground/10 p-8 transition-colors hover:border-foreground/20"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-foreground/10 transition-colors group-hover:bg-foreground group-hover:text-background">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            badge="The Experience"
            title="A Fully Digital Insider Experience"
            description="A fully digital, insider-level experience, built for everyone — not just industry insiders."
            className="mb-16"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-foreground/10 bg-foreground/[0.02] p-8"
              >
                <pillar.icon className="mb-4 h-6 w-6" />
                <h3 className="text-lg font-medium">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            badge="Featured Slate"
            title="Upcoming Film Opportunities"
            description="Curated slate of high-potential projects — vetted by industry veterans, open to everyday investors."
            className="mb-16"
          />

          <div className="grid gap-px bg-foreground/10 md:grid-cols-2">
            {films.map((film) => (
              <div key={film.title} className="bg-background p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl">{film.title}</h3>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">
                      {film.genre}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {film.status}
                  </span>
                </div>
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  Opening soon
                </p>
                <div className="mt-6 flex gap-8 font-mono text-sm">
                  <div>
                    <p className="text-muted-foreground">Min. Investment</p>
                    <p className="font-display text-xl">{film.minInvestment}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target Raise</p>
                    <p className="font-display text-xl">{film.targetRaise}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
