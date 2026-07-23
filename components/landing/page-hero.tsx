import { AnimatedSphere } from "./animated-sphere";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function PageHero({ badge, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 opacity-30 lg:h-[700px] lg:w-[700px]">
        <AnimatedSphere />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
          <span className="h-px w-8 bg-foreground/30" />
          {badge}
        </span>

        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] tracking-tight">
          {title}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {subtitle}
        </p>

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
