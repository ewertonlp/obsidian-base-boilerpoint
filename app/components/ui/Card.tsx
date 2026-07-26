import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  glowColor?: "blue" | "green" | "violet" | "gold" | "none";
}

export function Card({ 
  className = "", 
  elevated = false, 
  glowColor = "none",
  children, 
  ...props 
}: CardProps) {
  
  const baseStyle = "rounded-2xl backdrop-blur-xl border transition-all duration-300";
  const elevationStyle = elevated 
    ? "bg-obsidian-elevated/40 border-obsidian-border shadow-2xl" 
    : "bg-obsidian-surface/30 border-obsidian-border/50";
    
  const glows = {
    blue: "hover:border-accent-blue/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]",
    green: "hover:border-accent-green/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    gold: "hover:border-accent-gold/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]",
   violet: "hover:border-accent-violet/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
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