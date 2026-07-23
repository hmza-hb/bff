import React from "react";
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
});

export const metadata: Metadata = {
  title: "Big Film Fund | Hollywood Investing for Everyone",
  description:
    "Own a stake in real Hollywood films. Hand-picked for high potential, transparent, and built for everyday investors. Launching soon on WeFunder.",
  icons: {
    icon: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${hostGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster position="top-center" richColors theme="dark" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
