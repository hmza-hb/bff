"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedTetrahedron } from "./animated-tetrahedron";
import { WaitlistForm } from "@/components/waitlist-form";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="waitlist" ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          onMouseMove={handleMouseMove}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="flex-1">
                <h2 className="mb-8 font-display text-4xl leading-[0.95] tracking-tight lg:text-7xl">
                  Invest in the Movies
                  <br />
                  You Love
                </h2>

                <p className="mb-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
                  Be the first to own real stakes in curated Hollywood films.
                  Starting at $100. Transparent. VIP access. Launching soon on
                  WeFunder.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="group h-14 rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90"
                >
                  <Link href="/founders-club">
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="hidden h-[400px] w-[400px] items-center justify-center lg:flex">
                <AnimatedTetrahedron />
              </div>
            </div>

            <div className="mt-16 border-t border-foreground/10 pt-16">
              <WaitlistForm />
            </div>
          </div>

          <div className="absolute right-0 top-0 h-32 w-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
