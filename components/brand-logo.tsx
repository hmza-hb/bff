import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { image: 32, text: "text-sm" },
  md: { image: 40, text: "text-base" },
  lg: { image: 48, text: "text-lg" },
};

export function BrandLogo({
  size = "md",
  showText = true,
  className,
}: BrandLogoProps) {
  const { image, text } = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.jpeg"
        alt="Big Film Fund"
        width={image}
        height={image}
        className="rounded-full object-cover"
      />
      {showText && (
        <span className={cn("font-medium text-white", text)}>
          Big Film Fund
        </span>
      )}
    </Link>
  );
}
