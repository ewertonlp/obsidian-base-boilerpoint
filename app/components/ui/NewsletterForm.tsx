"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { subscribeToNewsletter } from "@/app/actions/email/subscribeToNewsletter"; 
import { CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus("loading");
    setMessage("");

    try {
      const response = await subscribeToNewsletter(email);
      
      if (response.success) {
        setStatus("success");
        setMessage(response.message || "You're on the list! Keep an eye on your inbox.");
        setEmail(""); // Limpa o campo
      } else {
        setStatus("error");
        setMessage(response.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
     
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            required
            className="w-full h-11 border border-obsidian-border/80"
          />
        </div>
        
  
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={status === "loading"}
          disabled={status === "success"}
          className="h-11 sm:w-auto w-full"
        >
          {status === "success" ? "Joined" : "Join Waitlist"}
        </Button>
      </form>

    
      {status === "success" && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-accent-green animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
      
      {status === "error" && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}