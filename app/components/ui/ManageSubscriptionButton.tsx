"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { CreditCard } from "lucide-react";

export function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleManage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/billing", { method: "POST" });
      const { url } = await response.json();
      window.location.href = url; // Redireciona para o portal do Stripe
    } catch (error) {
      console.error("Erro ao abrir portal:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleManage} 
      isLoading={isLoading} 
      variant="secondary" 
      className="bg-obsidian-surface border-obsidian-border hover:bg-obsidian-surface/80"
    >
      <CreditCard className="w-4 h-4 mr-2 text-text-secondary" />
     Manage Subscription
    </Button>
  );
}