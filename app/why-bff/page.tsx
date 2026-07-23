import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeader } from "@/components/landing/section-header";
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
    <SiteShell>
      <PageHero
        badge="Why BFF"
        title="Backed by Decades of Experience"
        subtitle="This isn't hype. It's a platform backed by decades of industry experience — from production to distribution to investor relations."
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
            badge="Track Record"
            title="Why Big Film Fund"
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item, i) => (
              <div
                key={i}
                className="bg-background p-8 transition-colors hover:bg-foreground/[0.02]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center border border-foreground/10">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed sm:text-base">{item.text}</p>
              </div>
            ))}
            <div className="flex items-center justify-center bg-foreground/[0.02] p-8 md:col-span-2 lg:col-span-1">
              <p className="text-center font-display text-lg sm:text-xl">
                Industry veterans.
                <br />
                <span className="text-muted-foreground">Investor-first platform.</span>
              </p>
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-lg text-muted-foreground">
            This isn&apos;t hype. It&apos;s a platform backed by decades of industry
            experience.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            badge="Our Edge"
            title="Built for Serious Film Investors"
            description="Every project vetted. Every dollar tracked. Every investor treated like an insider."
            className="mb-16"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="border border-foreground/10 p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-foreground/10 bg-foreground text-background">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
