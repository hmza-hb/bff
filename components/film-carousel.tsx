"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Film, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FilmSlide {
  id: string;
  title: string;
  genre: string;
  status: string;
  minInvestment: string;
  targetRaise: string;
  image: string;
  description: string;
}

export const filmSlides: FilmSlide[] = [
  {
    id: "1",
    title: "Midnight Protocol",
    genre: "Sci-Fi Thriller",
    status: "Pre-Production",
    minInvestment: "$100",
    targetRaise: "$2.5M",
    image: "/images/hero-bg.jpg",
    description:
      "A near-future thriller from an Oscar-nominated director. Global distribution pre-sold in 12 territories.",
  },
  {
    id: "2",
    title: "The Last Reel",
    genre: "Drama",
    status: "In Development",
    minInvestment: "$250",
    targetRaise: "$1.8M",
    image: "/images/solution-learn.png",
    description:
      "An intimate character study backed by Sundance alumni. Festival premiere strategy already in place.",
  },
  {
    id: "3",
    title: "Neon Crossroads",
    genre: "Action",
    status: "Casting",
    minInvestment: "$100",
    targetRaise: "$4.2M",
    image: "/images/solution-detect.png",
    description:
      "High-octane action with A-list talent attached. Major studio distribution partner confirmed.",
  },
  {
    id: "4",
    title: "Echoes of Tomorrow",
    genre: "Documentary",
    status: "Funding Open",
    minInvestment: "$100",
    targetRaise: "$950K",
    image: "/images/solution-neutralize.png",
    description:
      "Award-winning documentary team exploring untold stories. Streaming platform interest secured.",
  },
];

interface FilmCarouselProps {
  title?: string;
  subtitle?: string;
  slides?: FilmSlide[];
  className?: string;
}

export function FilmCarousel({
  title = "Upcoming Film Opportunities",
  subtitle = "Curated slate of high-potential projects — vetted by industry veterans, open to everyday investors.",
  slides = filmSlides,
  className,
}: FilmCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className={cn("relative overflow-hidden py-20 sm:py-24 md:py-28", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(220,38,38,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-medium tracking-wider text-red-500 uppercase">
              Featured Slate
            </p>
            <h2 className="text-balance text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-10 w-10 rounded-full border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-10 w-10 rounded-full border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-4 flex">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-[85%] lg:basis-[70%]"
              >
                <motion.div
                  animate={{
                    opacity: selectedIndex === index ? 1 : 0.6,
                    scale: selectedIndex === index ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-zinc-950/80" />
                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
                        <Film className="h-3 w-3" />
                        {slide.genre}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-400">
                          {slide.status}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock className="h-3 w-3" />
                          Opening soon
                        </span>
                      </div>

                      <h3 className="text-2xl font-normal tracking-tight text-white sm:text-3xl">
                        {slide.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {slide.description}
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6">
                        <div>
                          <p className="text-xs tracking-wider text-zinc-500 uppercase">
                            Min. Investment
                          </p>
                          <p className="mt-1 text-lg font-medium text-white">
                            {slide.minInvestment}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs tracking-wider text-zinc-500 uppercase">
                            Target Raise
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-lg font-medium text-white">
                            <TrendingUp className="h-4 w-4 text-red-500" />
                            {slide.targetRaise}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                selectedIndex === i
                  ? "w-8 bg-red-600"
                  : "w-4 bg-zinc-700 hover:bg-zinc-600"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
