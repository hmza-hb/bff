"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Discover",
    description:
      "Explore upcoming film opportunities on a clean, easy-to-use platform.",
    code: `// Browse curated film slate
bff.explore({
  status: 'opening-soon',
  minInvestment: 100
})

// Midnight Protocol — Sci-Fi Thriller
// The Last Reel — Drama
// Neon Crossroads — Action`,
  },
  {
    number: "II",
    title: "Invest",
    description:
      "Choose the films you believe in, and buy a real share in the action.",
    code: `bff.invest({
  project: 'midnight-protocol',
  amount: 500,
  portal: 'wefunder-reg-cf'
})

// Your stake is recorded
// Investor perks activated`,
  },
  {
    number: "III",
    title: "Track",
    description:
      "Get updates, enjoy special perks, and share in the profits — because you're not just watching, you're an owner.",
    code: `bff.dashboard({
  holdings: true,
  distributions: true,
  perks: 'vip'
})

// Real-time project updates
// Transparent profit sharing`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-background/50">
            <span className="h-px w-8 bg-background/30" />
            How It Works
          </span>
          <h2
            className={`font-display text-4xl tracking-tight transition-all duration-700 lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Three Steps to Ownership
            <br />
            <span className="text-background/50">
              A fully digital, insider-level experience, built for everyone.
            </span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`group w-full border-b border-background/10 py-8 text-left transition-all duration-500 ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="mb-3 font-display text-2xl transition-transform duration-300 group-hover:translate-x-2 lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-background/60">{step.description}</p>
                    {activeStep === index && (
                      <div className="mt-4 h-px overflow-hidden bg-background/20">
                        <div
                          className="h-full w-0 bg-background"
                          style={{ animation: "progress 5s linear forwards" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="self-start lg:sticky lg:top-32">
            <div className="overflow-hidden border border-background/10">
              <div className="flex items-center justify-between border-b border-background/10 px-6 py-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-background/20" />
                  <div className="h-3 w-3 rounded-full bg-background/20" />
                  <div className="h-3 w-3 rounded-full bg-background/20" />
                </div>
                <span className="font-mono text-xs text-background/40">investor.ts</span>
              </div>

              <div className="min-h-[280px] p-8 font-mono text-sm">
                <pre className="text-background/70">
                  {steps[activeStep].code.split("\n").map((line, lineIndex) => (
                    <div
                      key={`${activeStep}-${lineIndex}`}
                      className="code-line-reveal leading-loose"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-block w-8 select-none text-background/20">
                        {lineIndex + 1}
                      </span>
                      <span className="inline-flex">
                        {line.split("").map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              <div className="flex items-center gap-3 border-t border-background/10 px-6 py-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="font-mono text-xs text-background/40">Opening soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
