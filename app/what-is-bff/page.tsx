import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { FilmCarousel } from "@/components/film-carousel";
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

export default function WhatIsBffPage() {
  return (
    <SiteLayout>
      <main>
        <PageHero
          badge="What is BFF"
          title="Film Investing Made Simple"
          subtitle="Big Film Fund gives everyday people the chance to invest in real Hollywood films, and share in the potential upside as those films earn."
        >
          <Button asChild variant="solid" size="lg" className="h-12 px-8">
            <Link href="/#waitlist">Join the Waitlist</Link>
          </Button>
        </PageHero>

        <section className="border-b border-zinc-800/80 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="How It Works"
              title="Three Steps to Ownership"
              description="We carefully evaluate each opportunity, offer investments starting from $100, and give you VIP-level access and perks along the way."
              align="center"
              className="mx-auto mb-16 items-center"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="glass-card group rounded-2xl p-8 transition-colors hover:border-red-600/20"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-2 text-xl font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-800/80 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="The Experience"
              title="A Fully Digital Insider Experience"
              description="A fully digital, insider-level experience, built for everyone — not just industry insiders."
              className="mb-16"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8"
                >
                  <pillar.icon className="mb-4 h-6 w-6 text-red-500" />
                  <h3 className="text-lg font-medium text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FilmCarousel className="bg-zinc-950" />
      </main>
    </SiteLayout>
  );
}
