"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Film, Eye, Users } from "lucide-react";

const securityFeatures = [
  {
    icon: Film,
    title: "High Quality Slate",
    description:
      "Only high-potential return on investment film projects selected.",
  },
  {
    icon: Eye,
    title: "Transparent Economics",
    description:
      "Simple, clear, investor-first project accounting and tracking.",
  },
  {
    icon: Users,
    title: "Industry + Fintech Expertise",
    description:
      "Platform built by film, media, finance, and tech veterans.",
  },
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="our-edge"
      ref={sectionRef}
      className="relative overflow-hidden bg-foreground/[0.02] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              Our Edge
            </span>
            <h2 className="mb-8 font-display text-4xl tracking-tight lg:text-6xl">
              Built for Serious
              <br />
              Film Investors
            </h2>
            <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
              Every project vetted. Every dollar tracked. Every investor
              treated like an insider.
            </p>
            <Link
              href="/why-bff"
              className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              Learn More
            </Link>
          </div>

          <div className="grid gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`group border border-foreground/10 p-6 transition-all duration-500 hover:border-foreground/20 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/10 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
