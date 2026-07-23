import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
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
    <SiteLayout>
      <main>
        <PageHero
          badge="Why Now"
          title="The Moment for Film Investing"
          subtitle="Regulation, technology, and audience demand have converged. Hollywood investing is finally open — and Big Film Fund is building the platform to lead it."
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-white px-8 text-zinc-950 hover:bg-white/90"
          >
            <Link href="/#waitlist">Join the Waitlist</Link>
          </Button>
        </PageHero>

        <section className="border-b border-zinc-800/80 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Market Timing"
              title="Six Reasons the Time Is Now"
              align="center"
              className="mx-auto mb-16 items-center"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="glass-card group rounded-2xl p-8 transition-all hover:border-red-600/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-normal text-white">
                        {reason.stat}
                      </p>
                      <p className="text-xs text-zinc-500">{reason.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <SectionHeader
                badge="Platform Investment"
                title="Investing in Big Film Fund"
                description="This isn't about investing in one film. It's your chance to own a stake in the platform itself."
              />

              <div className="space-y-4">
                {goals.map((goal, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-xs font-medium text-red-500">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                      {goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-12 text-center text-base italic text-zinc-500 sm:text-lg">
              You&apos;re not just backing one story. You&apos;re helping build
              the engine behind a new wave of investor-backed films.
            </p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
