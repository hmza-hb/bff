import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { navLinks } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/80 bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(220,38,38,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              Hollywood film investing, finally open to everyone. Own real
              stakes in curated films starting at $100.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Investor Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800/80 pt-8 text-center">
          <p className="text-sm text-zinc-500">
            © 2026 Big Film Fund, Inc. All rights reserved.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-zinc-600">
            This is not an offer to sell securities. Investment opportunities
            will be made available through a regulated crowdfunding portal in
            compliance with SEC regulations.
          </p>
        </div>
      </div>
    </footer>
  );
}
