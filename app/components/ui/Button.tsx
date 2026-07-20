import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    
    // Mapeamento de estilos por variante
    const variants = {
      primary: "bg-accent-blue text-white shadow-md hover:bg-accent-blue/90 border border-transparent",
      secondary: "glass-panel hover:bg-obsidian-elevated text-text-primary",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-obsidian-elevated border border-transparent",
      danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
      gold: "bg-accent-gold text-obsidian shadow-sm hover:bg-accent-gold/90 font-semibold",
    };

    // Mapeamento de estilos por tamanho
    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg",
      md: "h-10 px-4 py-2 text-sm rounded-xl",
      lg: "h-12 px-6 text-base rounded-xl",
    };

    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-obsidian-border focus:ring-offset-2 focus:ring-offset-obsidian disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";