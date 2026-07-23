import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
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

export default function FoundersClubPage() {
  return (
    <SiteLayout>
      <main>
        <PageHero
          badge="Founders Club"
          title="Be an Early Believer"
          subtitle="As an early supporter and investor, you'll be part of a small group helping shape the future of film investing."
        >
          <Button asChild variant="solid" size="lg" className="h-12 px-8">
            <Link href="#join">Join the Founders Club</Link>
          </Button>
        </PageHero>

        <section className="border-b border-zinc-800/80 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Member Benefits"
              title="Exclusive Perks for Early Members"
              description="Join the waitlist to hear about the exclusive perks we're preparing for early members."
              align="center"
              className="mx-auto mb-16 items-center"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="glass-card group rounded-2xl p-8 transition-all hover:border-red-600/20 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.15)]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white transition-transform group-hover:scale-110">
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl">
              <SectionHeader
                badge="Join Now"
                title="Secure Your Founders Spot"
                description="Limited early membership. No commitment required — just your email to stay in the loop."
                align="center"
                className="mx-auto mb-10 items-center"
              />
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
