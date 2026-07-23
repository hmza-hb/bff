import { Navigation } from "./navigation";
import { FooterSection } from "./footer-section";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      {children}
      <FooterSection />
    </main>
  );
}
