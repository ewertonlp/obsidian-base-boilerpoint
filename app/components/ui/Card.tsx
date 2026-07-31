import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  glowColor?: "blue" | "green" | "amber" | "fuchsia" | "none";
}

export function Card({
  className = "",
  elevated = false,
  glowColor = "none",
  children,
  ...props
}: CardProps) {
  const baseStyle =
    "rounded-2xl backdrop-blur-xl border transition-all duration-300";
  const elevationStyle = elevated
    ? "bg-obsidian-elevated/40 border-obsidian-border shadow-2xl"
    : "bg-obsidian-surface/30 border-obsidian-border/50";

  const glows = {
    blue: "hover:border-accent-blue/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]",
    green:
      "hover:border-accent-green/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    amber:
      "hover:border-accent-amber/30 hover:shadow-[0_0_30px_rgba(254,154,0,0.1)]",
    fuchsia:
      "hover:border-accent-fuchsia/30 hover:shadow-[0_0_30px_rgba(200,0,200,0.2)]",
    none: "",
  };

  return (
    <div
      className={`${baseStyle} ${elevationStyle} ${glows[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
