"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/5 px-4 py-1.5 text-xs font-medium tracking-wider text-red-400 uppercase backdrop-blur-sm sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Launching soon on WeFunder
          </motion.div>

          <h1 className="max-w-3xl text-balance text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {"Hollywood Investing".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="mr-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="text-white/75">
              {"Finally Open to Everyone".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(10px)", opacity: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 0.4, delay: (i + 2) * 0.05 }}
                  className="mr-[0.2em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg"
          >
            Own a stake in real films — hand-picked for their high potential,
            transparent, and built for everyday investors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-white px-8 text-zinc-950 hover:bg-white/90"
            >
              <Link href="#waitlist">
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-zinc-600 bg-transparent text-white hover:bg-white/5"
            >
              <Link href="/what-is-bff">Learn More</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 sm:text-sm lg:justify-start"
          >
            <span>From $100 minimum</span>
            <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />
            <span>SEC-regulated portal</span>
            <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />
            <span>300+ projects produced</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative shrink-0"
        >
          <div className="absolute -inset-8 rounded-full bg-red-600/20 blur-3xl" />
          <div className="premium-glow relative">
            <Image
              src="/logo.jpeg"
              alt="Big Film Fund"
              width={240}
              height={240}
              className="relative rounded-full object-cover ring-2 ring-white/10 sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
