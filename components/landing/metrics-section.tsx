"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="font-display text-6xl tracking-tight lg:text-8xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

const metrics = [
  {
    value: 300,
    suffix: "+",
    prefix: "",
    label: "Film and TV projects produced",
  },
  {
    value: 12,
    suffix: "+",
    prefix: "",
    label: "Global distribution markets",
  },
  {
    value: 100,
    suffix: "",
    prefix: "$",
    label: "Minimum investment entry",
  },
  {
    value: 4,
    suffix: "",
    prefix: "",
    label: "Major festival recognitions",
  },
];

export function MetricsSection() {
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
      id="track-record"
      ref={sectionRef}
      className="relative border-y border-foreground/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 flex flex-col gap-8 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              Track Record
            </span>
            <h2
              className={`font-display text-4xl tracking-tight transition-all duration-700 lg:text-6xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Why Big Film Fund
              <br />
              <span className="text-muted-foreground">
                Decades of industry experience.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              This isn&apos;t hype. It&apos;s a platform backed by decades of
              industry experience — from production to distribution to investor
              relations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-background p-8 transition-all duration-700 lg:p-12 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter
                end={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
              />
              <div className="mt-4 text-lg text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
