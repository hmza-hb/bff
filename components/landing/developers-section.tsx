"use client";

import { useState, useEffect, useRef } from "react";

const goals = [
  "Build the technology and launch the Big Film Fund app",
  "Bring together our first slate of films",
  "Open Hollywood investing to millions of everyday people",
  "Grow a community of early believers who shape the platform",
];

export function DevelopersSection() {
  const [activeGoal, setActiveGoal] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGoal((prev) => (prev + 1) % goals.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Platform Investment
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Investing in
              <br />
              <span className="text-muted-foreground">Big Film Fund.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              This isn&apos;t about investing in one film. It&apos;s your chance to own a stake in the platform itself. Your investment will help us:
            </p>
            <p className="text-base italic text-muted-foreground">
              You&apos;re not just backing one story. You&apos;re helping build the engine behind a new wave of investor-backed films.
            </p>
          </div>
          
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {goals.map((goal, idx) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setActiveGoal(idx)}
                  className={`w-full flex items-start gap-4 px-6 py-6 border-b border-foreground/10 last:border-b-0 text-left transition-all duration-300 ${
                    activeGoal === idx ? "bg-foreground/[0.03]" : "hover:bg-foreground/[0.01]"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-mono transition-colors ${
                    activeGoal === idx ? "bg-foreground text-background" : "border border-foreground/20 text-muted-foreground"
                  }`}>
                    {idx + 1}
                  </span>
                  <p className={`text-base leading-relaxed pt-1 transition-opacity ${
                    activeGoal === idx ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {goal}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
