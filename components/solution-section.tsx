"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, TrendingUp, BarChart3, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/section-header";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Discover",
    description:
      "Explore upcoming film opportunities on a clean, easy-to-use platform.",
    icon: <Compass className="h-5 w-5" />,
    image: "/images/hero-bg.jpg",
  },
  {
    id: 2,
    title: "Invest",
    description:
      "Choose the films you believe in, and buy a real share in the action.",
    icon: <TrendingUp className="h-5 w-5" />,
    image: "/images/solution-learn.png",
  },
  {
    id: 3,
    title: "Track",
    description:
      "Get updates, enjoy special perks, and share in the profits — because you're not just watching, you're an owner.",
    icon: <BarChart3 className="h-5 w-5" />,
    image: "/images/solution-detect.png",
  },
];

export function SolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="overflow-hidden border-b border-zinc-800/80 bg-zinc-950 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="How It Works"
          title="Three Steps to Ownership"
          description="A fully digital, insider-level experience, built for everyone."
        />

        <div className="grid min-h-[360px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={features[activeIndex].image}
                  alt={features[activeIndex].title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-4 right-4 flex h-1 gap-2">
              {features.map((_, idx) => (
                <div key={idx} className="h-full flex-1 overflow-hidden rounded-full bg-white/10">
                  {activeIndex === idx && (
                    <motion.div
                      className="h-full rounded-full bg-red-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                  )}
                  {idx < activeIndex && (
                    <div className="h-full w-full rounded-full bg-red-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative w-full rounded-xl p-5 text-left outline-none transition-all duration-300 sm:p-6",
                  activeIndex === index
                    ? "glass-card border-red-600/20"
                    : "border border-transparent hover:bg-white/[0.02]"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "rounded-xl p-2.5 transition-colors duration-300",
                      activeIndex === index
                        ? "bg-red-600 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    )}
                  >
                    {feature.icon}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3
                      className={cn(
                        "text-lg font-medium transition-colors sm:text-xl",
                        activeIndex === index ? "text-white" : "text-zinc-500"
                      )}
                    >
                      {feature.title}
                    </h3>

                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden text-sm leading-relaxed text-zinc-400 sm:text-base"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <ChevronRight
                    className={cn(
                      "mt-1.5 h-5 w-5 shrink-0 transition-all",
                      activeIndex === index
                        ? "text-white/40"
                        : "text-transparent"
                    )}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
