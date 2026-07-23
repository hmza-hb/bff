export const navLinks = [
  { label: "Home", href: "/" },
  { label: "What is BFF", href: "/what-is-bff" },
  { label: "Why Now", href: "/why-now" },
  { label: "Why BFF", href: "/why-bff" },
  { label: "Founders Club", href: "/founders-club" },
] as const;

export type NavLink = (typeof navLinks)[number];
