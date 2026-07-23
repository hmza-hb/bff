"use client";

import { motion } from "framer-motion";
import { Crown, Bell, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";

const perks = [
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

export function PricingSection() {
  return (
    <section
      id="founders-club"
      className="border-b border-zinc-800/80 bg-zinc-950 py-20 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Early Access"
          title="Founders Club"
          description="As an early supporter and investor, you'll be part of a small group helping shape the future of film investing. Join the waitlist to hear about the exclusive perks we're preparing for early members."
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 transition-all hover:border-red-600/20 sm:p-8"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                <perk.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-white">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row">
          <Button
            asChild
            variant="solid"
            size="lg"
            className="h-12 w-full sm:w-auto sm:px-8"
          >
            <Link href="/founders-club">Explore Founders Club</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full sm:w-auto sm:px-8"
          >
            <Link href="/#waitlist">Join the Waitlist</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
