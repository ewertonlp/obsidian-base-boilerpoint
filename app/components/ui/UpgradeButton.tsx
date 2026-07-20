"use client";

export function UpgradeButton() {
  const handleUpgrade = async () => {
    const response = await fetch("/api/checkout", { method: "POST" });
    const { url } = await response.json();
    window.location.href = url; // Redireciona para o Stripe
  };

  return (
    <button onClick={handleUpgrade} className="bg-accent-blue text-white px-4 py-2 rounded-lg">
      Assinar Plano Pro
    </button>
  );
}