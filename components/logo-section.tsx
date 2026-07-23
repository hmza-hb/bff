"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

const goals = [
  "Build the technology and launch the Big Film Fund app",
  "Bring together our first slate of films",
  "Open Hollywood investing to millions of everyday people",
  "Grow a community of early believers who shape the platform",
];

export function LogoSection() {
  return (
    <section
      id="why-now"
      className="relative border-b border-zinc-800/80 bg-zinc-950 py-20 sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(220,38,38,0.06),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            badge="Platform Investment"
            title="Investing in Big Film Fund"
            description="This isn't about investing in one film. It's your chance to own a stake in the platform itself. Your investment will help us:"
          />

          <div className="space-y-3 sm:space-y-4">
            {goals.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card flex items-start gap-4 rounded-xl p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {goal}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-base italic text-zinc-500 sm:mt-16 sm:text-lg"
        >
          You&apos;re not just backing one story. You&apos;re helping build the
          engine behind a new wave of investor-backed films.
        </motion.p>
      </div>
    </section>
  );
}
