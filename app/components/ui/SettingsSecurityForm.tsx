"use client";

import { useState } from "react";
import { updatePasswordAction } from "@/app/actions/user";
import { Button } from "@/app/components/ui/Button";
import { Lock, CheckCircle2 } from "lucide-react";

export function SettingsSecurityForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setIsSuccess(false);
    setError(null);
    
    const result = await updatePasswordAction(formData);
    
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      // Limpa os campos do formulário
      (document.getElementById("security-form") as HTMLFormElement).reset();
    }
    
    setIsPending(false);
  };

  return (
    <div className="rounded-2xl border border-obsidian-border/50 bg-obsidian-surface/30 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
        <Lock className="h-5 w-5 text-accent-blue" />
        Account Security
      </h2>
      
      <form id="security-form" action={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-text-primary">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="flex h-11 mt-2 w-full rounded-xl border border-obsidian-border bg-obsidian-surface/50 px-4 text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirm_password" className="text-sm font-medium text-text-primary">
              Confirm New Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              minLength={6}
              className="flex h-11 w-full mt-2 rounded-xl border border-obsidian-border bg-obsidian-surface/50 px-4 text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-4 pt-4 border-t border-obsidian-border/50">
          <Button type="submit" isLoading={isPending} className="px-6">
            Update Password
          </Button>
          
          {isSuccess && (
            <span className="flex items-center text-sm font-medium text-emerald-400 animate-in fade-in duration-300">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Password updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}