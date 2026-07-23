"use client";

import { SectionHeader } from "@/components/section-header";

export function ProblemSection() {
  return (
    <section
      id="what-is-bff"
      className="relative border-b border-zinc-800/80 bg-zinc-950 py-20 sm:py-28 md:py-32"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.02]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeader
            badge="Film Investing"
            title="Film Investing Made Simple"
            description="Big Film Fund gives everyday people the chance to invest in real Hollywood films, and share in the potential upside as those films earn. We carefully evaluate each opportunity, offer investments starting from $100, and give you VIP-level access and perks along the way."
            align="center"
            className="items-center"
          />
        </div>
      </div>
    </section>
  );
}
