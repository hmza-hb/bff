import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import {
  Clapperboard,
  Star,
  Globe,
  Award,
  Film,
  Eye,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why BFF | Big Film Fund",
  description:
    "300+ film and TV projects. Academy Award collaborators. Global distribution. Decades of industry experience.",
};

const credentials = [
  {
    icon: Clapperboard,
    text: "Our team has produced more than 300 film and TV projects",
  },
  {
    icon: Star,
    text: "We've collaborated with leading actors and filmmakers, including Academy Award winners",
  },
  {
    icon: Globe,
    text: "We have deep experience securing major global distribution deals across key markets",
  },
  {
    icon: Award,
    text: "Past films have earned recognition from Sundance, Cannes, BAFTA, and the Oscars",
  },
  {
    icon: Film,
    text: "Our first film project is already in development",
  },
];

const features = [
  {
    icon: Film,
    title: "High Quality Slate",
    description:
      "Only high-potential return on investment film projects selected.",
  },
  {
    icon: Eye,
    title: "Transparent Economics",
    description:
      "Simple, clear, investor-first project accounting and tracking.",
  },
  {
    icon: Users,
    title: "Industry + Fintech Expertise",
    description:
      "Platform built by film, media, finance, and tech veterans.",
  },
];

export default function WhyBffPage() {
  return (
    <SiteLayout>
      <main>
        <PageHero
          badge="Why BFF"
          title="Backed by Decades of Experience"
          subtitle="This isn't hype. It's a platform backed by decades of industry experience — from production to distribution to investor relations."
        >
          <Button asChild variant="solid" size="lg" className="h-12 px-8">
            <Link href="/#waitlist">Join the Waitlist</Link>
          </Button>
        </PageHero>

        <section className="border-b border-zinc-800/80 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Track Record"
              title="Why Big Film Fund"
              align="center"
              className="mx-auto mb-16 items-center"
            />

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-2 lg:grid-cols-3">
              {credentials.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-950 p-8 transition-colors hover:bg-zinc-900/80"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-center bg-gradient-to-br from-red-600/10 to-zinc-950 p-8 md:col-span-2 lg:col-span-1">
                <p className="text-center text-lg font-medium text-white sm:text-xl">
                  Industry veterans.
                  <br />
                  <span className="text-zinc-400">Investor-first platform.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Our Edge"
              title="Built for Serious Film Investors"
              description="Every project vetted. Every dollar tracked. Every investor treated like an insider."
              className="mb-16"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-red-600 to-red-800 shadow-lg shadow-red-600/20">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
