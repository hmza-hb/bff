"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
        <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
          {badge}
        </span>
      </div>

      <h2 className="max-w-3xl text-balance text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
        {title.split(" ").map((word, i) => (
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

      {description && (
        <p className="max-w-2xl text-balance text-base leading-relaxed text-zinc-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
