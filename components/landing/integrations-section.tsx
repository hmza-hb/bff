"use client";

import { useEffect, useState, useRef } from "react";

const goals = [
  {
    name: "Build the App",
    category: "Technology",
    detail: "Build the technology and launch the Big Film Fund app",
  },
  {
    name: "First Slate",
    category: "Content",
    detail: "Bring together our first slate of films",
  },
  {
    name: "Open Access",
    category: "Democratize",
    detail: "Open Hollywood investing to millions of everyday people",
  },
  {
    name: "Early Community",
    category: "Community",
    detail: "Grow a community of early believers who shape the platform",
  },
];

export function IntegrationsSection() {
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
    <section id="platform-investment" ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div
          className={`mx-auto mb-16 max-w-3xl text-center transition-all duration-700 lg:mb-24 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            Platform Investment
            <span className="h-px w-8 bg-foreground/30" />
          </span>
          <h2 className="mb-6 font-display text-4xl tracking-tight lg:text-6xl">
            Investing in Big Film Fund
          </h2>
          <p className="text-xl text-muted-foreground">
            This isn&apos;t about investing in one film. It&apos;s your chance
            to own a stake in the platform itself. Your investment will help us:
          </p>
        </div>
      </div>

      <div className="mb-6 w-full">
        <div className="marquee flex gap-6">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 gap-6">
              {goals.map((goal) => (
                <div
                  key={`${goal.name}-${setIndex}`}
                  className="group shrink-0 border border-foreground/10 px-8 py-6 transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/[0.02]"
                >
                  <div className="text-lg font-medium transition-transform group-hover:translate-x-1">
                    {goal.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{goal.category}</div>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">{goal.detail}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <p className="text-lg text-muted-foreground">
          You&apos;re not just backing one story. You&apos;re helping build the
          engine behind a new wave of investor-backed films.
        </p>
      </div>
    </section>
  );
}
