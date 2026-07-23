"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthPage = pathname.startsWith("/login");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "left-4 right-4 top-4" : "left-0 right-0 top-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/80 shadow-lg backdrop-blur-xl"
            : "max-w-[1400px] bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 transition-all duration-500 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          <BrandLogo size={isScrolled ? "sm" : "md"} />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm transition-colors duration-300",
                    active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className={`text-foreground/70 transition-all duration-500 hover:text-foreground ${isScrolled ? "text-xs" : "text-sm"}`}
            >
              Login
            </Link>
            <Button
              asChild
              size="sm"
              className={`rounded-full bg-foreground text-background transition-all duration-500 hover:bg-foreground/90 ${isScrolled ? "h-8 px-4 text-xs" : "px-6"}`}
            >
              <Link href="/#waitlist">Join the Waitlist</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex h-full flex-col px-8 pb-8 pt-28">
          <div className="flex flex-1 flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-display text-5xl text-foreground transition-all duration-500 hover:text-muted-foreground ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            className={`flex gap-4 border-t border-foreground/10 pt-8 transition-all duration-500 ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              asChild
              variant="outline"
              className="h-14 flex-1 rounded-full text-base"
            >
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="h-14 flex-1 rounded-full bg-foreground text-base text-background"
            >
              <Link href="/#waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                Join the Waitlist
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
