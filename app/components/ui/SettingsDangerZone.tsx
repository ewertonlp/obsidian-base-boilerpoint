"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { deleteAccountAction } from "@/app/actions/user";
import { Button } from "@/app/components/ui/Button";
import { AlertTriangle, X } from "lucide-react";
import { useMounted } from "@/app/hooks/use-mounted";

export function SettingsDangerZone() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (isConfirming) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isConfirming]);

  const handleDelete = async () => {
    setIsPending(true);
    await deleteAccountAction();
  };

  const modalContent = (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-0">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => !isPending && setIsConfirming(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md rounded-2xl border border-obsidian-border/80 bg-obsidian-surface p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Are you absolutely sure?
          </h3>
          <button
            onClick={() => !isPending && setIsConfirming(false)}
            className="text-text-secondary hover:text-text-primary transition-colors rounded-full p-1 hover:bg-obsidian-surface/50"
            disabled={isPending}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-text-secondary mb-8">
          This action cannot be undone. This will permanently delete your
          account, remove your subscription, and erase all your data from our
          servers.
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => setIsConfirming(false)}
            disabled={isPending}
            className="border border-obsidian-border/50 hover:bg-obsidian-surface/50 sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isPending}
            className="bg-red-500 text-white hover:bg-red-600 sm:w-auto w-full"
          >
            Yes, delete my account
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        Danger Zone
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Deleting your account is a permanent action. All your data, AI
        generations, and settings will be erased immediately and cannot be
        recovered.
      </p>

      <Button
        variant="danger"
        onClick={() => setIsConfirming(true)}
        className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
      >
        Delete my account
      </Button>

      {isConfirming && mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
