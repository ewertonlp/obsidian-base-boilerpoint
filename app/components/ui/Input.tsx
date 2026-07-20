import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, icon, id, ...props }, ref) => {
    
    // Gerar um ID aleatório se não for fornecido, para conectar o label ao input
    const inputId = id || Math.random().toString(36).substring(7);

    return (
      <div className="flex flex-col w-full">
        {/* Label Opcional */}
        {label && (
          <label htmlFor={inputId} className="mb-1.5 text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {/* Ícone Opcional (posicionado à esquerda) */}
          {icon && (
            <div className="absolute left-3 text-text-secondary">
              {icon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={`
              flex h-10 w-full rounded-xl bg-obsidian-surface/50 px-3 py-2 text-sm text-text-primary 
              border transition-all placeholder:text-text-secondary/50 focus:outline-none focus:ring-1
              ${icon ? "pl-10" : ""} 
              ${error 
                ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                : "border-obsidian-border/50 focus:border-accent-blue focus:ring-accent-blue"
              }
              disabled:cursor-not-allowed disabled:opacity-50
              ${className}
            `}
            {...props}
          />
        </div>

        {/* Mensagem de Erro Opcional */}
        {error && (
          <span className="mt-1.5 text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";