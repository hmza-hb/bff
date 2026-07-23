"use client";

import Link from "next/link";
import { AnimatedWave } from "./animated-wave";
import { BrandLogo } from "@/components/brand-logo";
import { navLinks } from "@/lib/nav-links";

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Use", href: "#" },
  { name: "Investor Disclosures", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="pointer-events-none absolute inset-0 h-64 overflow-hidden opacity-20">
        <AnimatedWave />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-8">
            <div className="col-span-2">
              <BrandLogo size="md" className="mb-6" />

              <p className="mb-8 max-w-xs leading-relaxed text-muted-foreground">
                Hollywood film investing, finally open to everyone. Own real
                stakes in curated films starting at $100.
              </p>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-medium">Navigate</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-medium">Legal</h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-foreground/10 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 Big Film Fund, Inc. All rights reserved.
          </p>
          <p className="max-w-xl text-xs text-muted-foreground">
            This is not an offer to sell securities. Investment opportunities
            will be made available through a regulated crowdfunding portal in
            compliance with SEC regulations.
          </p>
        </div>
      </div>
    </footer>
  );
}
