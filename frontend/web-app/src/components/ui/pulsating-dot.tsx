import { cn } from "@/lib/utils";

export type PulsatingDotVariant = "active" | "mutated" | "closed";

export function PulsatingDot({
  className,
  variant = "active",
}: {
  className?: string;
  variant?: PulsatingDotVariant;
}) {
  if (variant === "active") {
    return (
      <span
        className={cn(
          "relative flex h-3 w-3 items-center justify-center",
          className
        )}
      >
        <span className="absolute inline-flex h-full w-full rounded-full border-2 border-primary opacity-75 animate-ping" />
        <span className="relative h-2 w-2 rounded-full bg-primary block" />
      </span>
    );
  }
  const color =
    variant === "mutated"
      ? "bg-yellow-400"
      : variant === "closed"
      ? "bg-destructive"
      : "bg-primary";
  return <span className={cn("h-2 w-2 rounded-full", color, className)} />;
}
