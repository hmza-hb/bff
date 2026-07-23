"use client";

import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/waitlist-form";

export function CtaSection() {
  return (
    <section id="waitlist" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-zinc-950/75" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 md:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {"Invest in the Movies You Love".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(8px)", opacity: 0 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="mr-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="mt-6 text-balance text-base leading-relaxed text-zinc-300 sm:text-lg">
            Be the first to own real stakes in curated Hollywood films. Starting
            at $100. Transparent. VIP access. Launching soon on WeFunder.
          </p>

          <div className="mt-10 text-left">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
