import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { image: 32, text: "text-base" },
  md: { image: 40, text: "text-lg" },
  lg: { image: 48, text: "text-xl" },
};

export function BrandLogo({
  size = "md",
  showText = true,
  className,
}: BrandLogoProps) {
  const { image, text } = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <Image
        src="/logo.jpeg"
        alt="Big Film Fund"
        width={image}
        height={image}
        className="rounded-full object-cover ring-1 ring-foreground/10"
      />
      {showText && (
        <span className={cn("font-display tracking-tight", text)}>
          Big Film Fund
        </span>
      )}
    </Link>
  );
}
