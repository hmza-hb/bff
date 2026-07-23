import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeader } from "@/components/landing/section-header";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Globe,
  Smartphone,
  Scale,
  Zap,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Now | Big Film Fund",
  description:
    "The timing is right for democratized Hollywood investing. Regulation, technology, and audience demand have converged.",
};

const reasons = [
  {
    icon: Scale,
    title: "Regulation Has Caught Up",
    description:
      "SEC Regulation Crowdfunding enables everyday investors to participate in private offerings — including film projects — with proper protections and transparency.",
    stat: "2016+",
    statLabel: "Reg CF enabled",
  },
  {
    icon: Smartphone,
    title: "Fintech Meets Hollywood",
    description:
      "Digital investment platforms have democratized access to asset classes that were once reserved for wealthy insiders. Film is the next frontier.",
    stat: "$100",
    statLabel: "Minimum entry",
  },
  {
    icon: Globe,
    title: "Global Streaming Demand",
    description:
      "The appetite for premium content has never been higher. Streaming platforms, international markets, and ancillary revenue create multiple paths to returns.",
    stat: "300+",
    statLabel: "Projects produced",
  },
  {
    icon: TrendingUp,
    title: "Alternative Assets Rising",
    description:
      "Modern portfolios increasingly include alternatives. Film investments offer uncorrelated exposure with cultural and financial upside.",
    stat: "12+",
    statLabel: "Distribution markets",
  },
  {
    icon: Zap,
    title: "First-Mover Advantage",
    description:
      "Big Film Fund is building the infrastructure now — technology, slate, and community — before the mainstream rush arrives.",
    stat: "2026",
    statLabel: "Platform launch",
  },
  {
    icon: BarChart3,
    title: "Transparent Economics",
    description:
      "Investors demand clarity. Our platform provides investor-first accounting, real-time tracking, and clear profit-sharing structures.",
    stat: "100%",
    statLabel: "Digital experience",
  },
];

const goals = [
  "Build the technology and launch the Big Film Fund app",
  "Bring together our first slate of films",
  "Open Hollywood investing to millions of everyday people",
  "Grow a community of early believers who shape the platform",
];

export default function WhyNowPage() {
  return (
    <SiteShell>
      <PageHero
        badge="Why Now"
        title="The Moment for Film Investing"
        subtitle="Regulation, technology, and audience demand have converged. Hollywood investing is finally open — and Big Film Fund is building the platform to lead it."
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
            badge="Market Timing"
            title="Six Reasons the Time Is Now"
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="group border border-foreground/10 p-8 transition-colors hover:border-foreground/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center border border-foreground/10">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl">{reason.stat}</p>
                    <p className="text-xs text-muted-foreground">{reason.statLabel}</p>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-medium">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            badge="Platform Investment"
            title="Investing in Big Film Fund"
            description="This isn't about investing in one film. It's your chance to own a stake in the platform itself."
            className="mb-16"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {goals.map((goal, i) => (
              <div
                key={goal}
                className="flex gap-6 border border-foreground/10 p-8"
              >
                <span className="font-display text-4xl text-foreground/20">
                  {i + 1}
                </span>
                <p className="text-lg leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-3xl text-lg text-muted-foreground">
            You&apos;re not just backing one story. You&apos;re helping build the
            engine behind a new wave of investor-backed films.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
