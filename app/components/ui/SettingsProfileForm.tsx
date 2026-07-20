"use client";

import { useState } from "react";
import { updateProfileAction } from "@/app/actions/user";
import { Button } from "@/app/components/ui/Button";
import { User, Mail, CheckCircle2 } from "lucide-react";

interface SettingsProfileFormProps {
  initialName: string;
  email: string;
}

export function SettingsProfileForm({ initialName, email }: SettingsProfileFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setIsSuccess(false);
    
    const result = await updateProfileAction(formData);
    
    if (result.success) {
      setIsSuccess(true);
      // Remove a mensagem de sucesso após 3 segundos
      setTimeout(() => setIsSuccess(false), 3000);
    }
    
    setIsPending(false);
  };

  return (
    <div className="rounded-2xl border border-obsidian-border/50 bg-obsidian-surface/30 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-text-primary mb-6">User Profile</h2>
      
      <form action={handleSubmit} className="space-y-6">
        
        {/* Campo Bloqueado: E-mail */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="flex h-11 w-full rounded-xl border border-obsidian-border/50 bg-obsidian-bg/50 px-4 text-sm text-text-secondary opacity-70 cursor-not-allowed focus:outline-none"
          />
          <p className="text-xs text-text-secondary/70">The email can&apos;t be changed at the moment.</p>
        </div>

        {/* Campo Editável: Nome */}
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium text-text-primary flex items-center gap-2">
            <User className="h-4 w-4" /> Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            defaultValue={initialName}
            required
            className="flex h-11 w-full rounded-xl border border-obsidian-border bg-obsidian-surface/50 px-4 text-sm text-text-primary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all"
            placeholder="Your name"
          />
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-obsidian-border/50">
          <Button type="submit" isLoading={isPending} className="px-6">
            Save Changes
          </Button>
          
          {isSuccess && (
            <span className="flex items-center text-sm font-medium text-emerald-400 animate-in fade-in duration-300">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Profile updated
            </span>
          )}
        </div>
      </form>
    </div>
  );
}