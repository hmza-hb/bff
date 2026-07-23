"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Eye, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "1",
    icon: <Film className="h-5 w-5 text-white" />,
    title: "High Quality Slate",
    description:
      "Only high-potential return on investment film projects selected.",
  },
  {
    id: "2",
    icon: <Eye className="h-5 w-5 text-white" />,
    title: "Transparent Economics",
    description:
      "Simple, clear, investor-first project accounting and tracking.",
  },
  {
    id: "3",
    icon: <Users className="h-5 w-5 text-white" />,
    title: "Industry + Fintech Expertise",
    description:
      "Platform built by film, media, finance, and tech veterans.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FeaturesSection({
  preHeading = "Our Edge",
  headline = "Built for Serious Film Investors",
  features = DEFAULT_FEATURES,
  className,
}: {
  preHeading?: string;
  headline?: string;
  features?: FeatureItem[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-b border-zinc-800/80 bg-zinc-950 py-20 sm:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={preHeading}
          title={headline}
          className="mb-12 sm:mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="glass-card group rounded-2xl p-8 transition-all hover:border-red-600/20"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-red-600 to-red-800 shadow-lg shadow-red-600/20 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h4 className="text-xl font-medium tracking-tight text-white">
                {feature.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Button asChild variant="solid" size="lg" className="h-12 px-8">
            <Link href="/why-bff">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
