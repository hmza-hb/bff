"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "overlay" | "solid";
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isOverlay = variant === "overlay" && !scrolled;
  const isAuthPage = pathname.startsWith("/login");

  if (isAuthPage) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        scrolled || variant === "solid"
          ? "border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo size="sm" />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-white"
                    : isOverlay
                      ? "text-white/70 hover:text-white"
                      : "text-zinc-400 hover:text-white"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-[1.15rem] h-px bg-red-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className={cn(
              "hidden text-sm font-medium transition-colors sm:block",
              isOverlay ? "text-white/80 hover:text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            Login
          </Link>
          <Button
            asChild
            size="sm"
            className="hidden bg-white text-zinc-950 hover:bg-white/90 sm:inline-flex"
          >
            <Link href="/#waitlist">Join the Waitlist</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden",
                  isOverlay
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-zinc-700 text-white hover:bg-zinc-800"
                )}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-zinc-800 bg-zinc-950 sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-1">
                <AnimatePresence>
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-4 py-3.5 text-base transition-colors",
                            active
                              ? "bg-red-600/10 text-white"
                              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          )}
                        >
                          {link.label}
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <div className="my-4 h-px bg-zinc-800" />

                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3.5 text-base text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                >
                  Login
                </Link>
                <Button
                  asChild
                  className="mt-2 h-12 w-full bg-white text-zinc-950 hover:bg-white/90"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/#waitlist">Join the Waitlist</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
