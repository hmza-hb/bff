import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface SiteLayoutProps {
  children: React.ReactNode;
  navbarVariant?: "overlay" | "solid";
  showMarginLines?: boolean;
}

export function SiteLayout({
  children,
  navbarVariant = "solid",
  showMarginLines = true,
}: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {showMarginLines && (
        <div className="pointer-events-none fixed inset-0 z-40">
          <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative h-full">
              <div className="absolute left-0 top-0 h-full w-px bg-zinc-800/50" />
              <div className="absolute right-0 top-0 h-full w-px bg-zinc-800/50" />
            </div>
          </div>
        </div>
      )}

      <Navbar variant={navbarVariant} />
      {children}
      <Footer />
    </div>
  );
}
