import { SiteLayout } from "@/components/site-layout";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { SolutionSection } from "@/components/solution-section";
import { LogoSection } from "@/components/logo-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { FilmCarousel } from "@/components/film-carousel";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <SiteLayout navbarVariant="overlay">
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FilmCarousel className="border-y border-zinc-800/80 bg-zinc-950" />
        <LogoSection />
        <TestimonialsSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
    </SiteLayout>
  );
}
