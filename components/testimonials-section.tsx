"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  Star,
  Globe,
  Award,
  Film,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";

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

export function TestimonialsSection() {
  return (
    <section
      id="why-bff"
      className="border-b border-zinc-800/80 bg-zinc-950 py-20 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Track Record"
          title="Why Big Film Fund"
          align="center"
          className="mx-auto mb-12 items-center sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-zinc-950 p-6 transition-colors hover:bg-zinc-900/80 sm:p-8"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-base text-zinc-500 sm:mt-12 sm:text-lg"
        >
          This isn&apos;t hype. It&apos;s a platform backed by decades of
          industry experience.
        </motion.p>
      </div>
    </section>
  );
}
