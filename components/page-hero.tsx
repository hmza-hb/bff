"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  badge,
  title,
  subtitle,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-zinc-800/80 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pb-24",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(220,38,38,0.15),transparent)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/5 px-4 py-1.5 text-xs font-medium tracking-wider text-red-400 uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              {badge}
            </motion.div>
          )}

          <h1 className="text-balance text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(8px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="mr-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-balance text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
