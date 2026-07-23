import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/landing/site-shell";
import { PageHero } from "@/components/landing/page-hero";
import { SectionHeader } from "@/components/landing/section-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { Button } from "@/components/ui/button";
import { Crown, Bell, Star, Users, Gift, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Founders Club | Big Film Fund",
  description:
    "Join the Founders Club for priority access, insider updates, and exclusive perks as an early Big Film Fund supporter.",
};

const perks = [
  {
    icon: Crown,
    title: "Priority Access",
    description:
      "Be first in line when film opportunities go live on the platform — before the general public.",
  },
  {
    icon: Bell,
    title: "Insider Updates",
    description:
      "Exclusive behind-the-scenes news, platform progress reports, and early slate previews.",
  },
  {
    icon: Star,
    title: "Founding Recognition",
    description:
      "Special founding member status and recognition as we launch and grow the platform.",
  },
  {
    icon: Users,
    title: "Shape the Platform",
    description:
      "Help influence features, film selection criteria, and community initiatives as an early believer.",
  },
  {
    icon: Gift,
    title: "Exclusive Perks",
    description:
      "VIP premiere invitations, set visits, and investor-only experiences on select projects.",
  },
  {
    icon: Lock,
    title: "Early WeFunder Access",
    description:
      "First notification when our Reg CF offering goes live on WeFunder — with allocation priority.",
  },
];

const homePerks = [
  {
    icon: Crown,
    title: "Priority Access",
    description:
      "Be first in line when film opportunities go live on the platform.",
  },
  {
    icon: Bell,
    title: "Insider Updates",
    description:
      "Exclusive behind-the-scenes news and platform progress reports.",
  },
  {
    icon: Star,
    title: "Special Recognition",
    description:
      "Founding member status as we launch and grow the platform.",
  },
  {
    icon: Users,
    title: "Shape the Future",
    description:
      "Help influence the platform as an early believer and supporter.",
  },
];

export default function FoundersClubPage() {
  return (
    <SiteShell>
      <PageHero
        badge="Founders Club"
        title="Be an Early Believer"
        subtitle="As an early supporter and investor, you'll be part of a small group helping shape the future of film investing."
      >
        <Button
          asChild
          size="lg"
          className="h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
        >
          <Link href="#join">Join the Founders Club</Link>
        </Button>
      </PageHero>

      <section className="border-y border-foreground/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            badge="Member Benefits"
            title="Exclusive Perks for Early Members"
            description="Join the waitlist to hear about the exclusive perks we're preparing for early members."
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="group border border-foreground/10 p-8 transition-colors hover:border-foreground/20"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-foreground/10 bg-foreground text-background transition-transform group-hover:scale-105">
                  <perk.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {homePerks.map((perk) => (
              <div key={perk.title} className="border border-foreground/10 p-6">
                <perk.icon className="mb-4 h-5 w-5" />
                <h3 className="font-medium">{perk.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="py-24 lg:py-32">
        <div className="mx-auto max-w-xl px-6 lg:px-12">
          <SectionHeader
            badge="Join Now"
            title="Secure Your Founders Spot"
            description="Limited early membership. No commitment required — just your email to stay in the loop."
            align="center"
            className="mx-auto mb-10"
          />
          <WaitlistForm />
        </div>
      </section>
    </SiteShell>
  );
}
