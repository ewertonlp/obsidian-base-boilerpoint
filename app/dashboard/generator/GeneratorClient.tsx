// src/app/dashboard/generator/GeneratorClient.tsx
"use client";

import { useState } from "react";
import { useCompletion } from '@ai-sdk/react';
import { Sparkles, Copy, Check, Loader2, Send } from "lucide-react";

export default function GeneratorClient() {
  const [tone, setTone] = useState("Professional");
  const [copied, setCopied] = useState(false);

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: "/api/generate",
    body: { tone },
    onError: (err) => {
      console.error("Erro na IA:", err);
      alert("Ocorreu um erro ao gerar. Verifique o console do navegador.");
    },
  });

  const copyToClipboard = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent-blue" />
          AI Generator
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Describe what you need, and let the AI craft the perfect content for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Controles */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 bg-obsidian-surface/30 border border-obsidian-border/50 p-6 rounded-xl backdrop-blur-xl">
            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Tone of Voice</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-obsidian-elevated border border-obsidian-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all"
              >
                <option value="Professional">Professional</option>
                <option value="Casual & Friendly">Casual & Friendly</option>
                <option value="Persuasive (Sales)">Persuasive (Sales)</option>
                <option value="Humorous">Humorous</option>
                <option value="Academic">Academic</option>
              </select>
            </div>

            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">What do you want to create?</label>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="E.g., Write a 3-paragraph Instagram caption for a luxury car detailing service..."
                className="w-full h-32 bg-obsidian-elevated border border-obsidian-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-accent-blue resize-none transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !input}
              className="w-full flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Generate Content
                </>
              )}
            </button>
          </form>
        </div>

        {/* Lado Direito: Resultado da IA */}
        <div className="lg:col-span-8">
          <div className="h-full min-h-[400px] flex flex-col bg-obsidian-surface/30 border border-obsidian-border/50 rounded-xl backdrop-blur-xl overflow-hidden relative group">
            {/* Toolbar do Resultado */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-obsidian-border/50 bg-obsidian-elevated/30">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Output
              </span>
              {completion && (
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors bg-obsidian-elevated px-2 py-1 rounded-md border border-obsidian-border/50"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Text"}
                </button>
              )}
            </div>

            {/* Área de Texto */}
            <div className="p-6 flex-1 overflow-y-auto">
              {completion ? (
                <div className="prose prose-invert max-w-none text-text-primary text-sm leading-relaxed whitespace-pre-wrap">
                  {completion}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-text-secondary/50 space-y-4">
                  <Sparkles className="w-12 h-12 opacity-20" />
                  <p className="text-sm">Your generated content will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}