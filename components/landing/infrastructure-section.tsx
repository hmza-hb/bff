"use client";

import { useEffect, useState, useRef } from "react";

const films = [
  {
    title: "Midnight Protocol",
    genre: "Sci-Fi Thriller",
    status: "Pre-Production",
    description:
      "A near-future thriller from an Oscar-nominated director. Global distribution pre-sold in 12 territories.",
    minInvestment: "$100",
    targetRaise: "$2.5M",
  },
  {
    title: "The Last Reel",
    genre: "Drama",
    status: "In Development",
    description:
      "An intimate character study backed by Sundance alumni. Festival premiere strategy already in place.",
    minInvestment: "$250",
    targetRaise: "$1.8M",
  },
  {
    title: "Neon Crossroads",
    genre: "Action",
    status: "Casting",
    description:
      "High-octane action with A-list talent attached. Major studio distribution partner confirmed.",
    minInvestment: "$100",
    targetRaise: "$4.2M",
  },
  {
    title: "Echoes of Tomorrow",
    genre: "Documentary",
    status: "Funding Open",
    description:
      "Award-winning documentary team exploring untold stories. Streaming platform interest secured.",
    minInvestment: "$100",
    targetRaise: "$950K",
  },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilm, setActiveFilm] = useState(0);
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
      setActiveFilm((prev) => (prev + 1) % films.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              Featured Slate
            </span>
            <h2 className="mb-8 font-display text-4xl tracking-tight lg:text-6xl">
              Upcoming Film
              <br />
              Opportunities
            </h2>
            <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
              Curated slate of high-potential projects — vetted by industry
              veterans, open to everyday investors.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="mb-2 font-display text-4xl lg:text-5xl">4</div>
                <div className="text-sm text-muted-foreground">Projects in slate</div>
              </div>
              <div>
                <div className="mb-2 font-display text-4xl lg:text-5xl">$100</div>
                <div className="text-sm text-muted-foreground">Min. investment</div>
              </div>
              <div>
                <div className="mb-2 font-display text-4xl lg:text-5xl">$9.5M</div>
                <div className="text-sm text-muted-foreground">Combined raise</div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all delay-200 duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="border border-foreground/10">
              <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
                <span className="font-mono text-sm text-muted-foreground">Film Slate</span>
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
                  Opening soon
                </span>
              </div>

              <div>
                {films.map((film, index) => (
                  <div
                    key={film.title}
                    className={`border-b border-foreground/5 px-6 py-5 transition-all duration-300 last:border-b-0 ${
                      activeFilm === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-2 h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
                            activeFilm === index ? "bg-foreground" : "bg-foreground/20"
                          }`}
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">{film.title}</span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {film.genre}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{film.description}</p>
                          <div className="mt-3 flex gap-6 font-mono text-xs text-muted-foreground">
                            <span>Min. {film.minInvestment}</span>
                            <span>Target {film.targetRaise}</span>
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {film.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
