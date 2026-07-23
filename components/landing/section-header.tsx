import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-foreground/30" />
          {badge}
          {align === "center" && <span className="h-px w-8 bg-foreground/30" />}
        </span>
      )}
      <h2 className="font-display text-4xl tracking-tight lg:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
