"use client";

import { useState } from "react";
import { deleteAccountAction } from "@/app/actions/user";
import { Button } from "@/app/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export function SettingsDangerZone() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    await deleteAccountAction();
    // Não precisamos setar isLoading para false porque a ação fará um redirecionamento forçado
  };

  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        Danger Zone
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Deleting your account is a permanent action. All your data, AI generations, and settings will be erased immediately and cannot be recovered.
      </p>
      
      {!isConfirming ? (
        <Button 
          variant="secondary" 
          onClick={() => setIsConfirming(true)}
          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20"
        >
          Delete my account
        </Button>
      ) : (
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
          <Button 
            onClick={handleDelete} 
            isLoading={isPending}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Yes, delete permanently
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setIsConfirming(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}