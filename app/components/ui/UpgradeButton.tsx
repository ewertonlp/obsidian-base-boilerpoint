"use client"

export function UpgradeButton() {
  const handleUpgrade = async () => {
    const response = await fetch("/api/checkout", { method: "POST" });
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <button onClick={handleUpgrade} className="bg-accent-blue hover:bg-accent-blue/80 text-white px-4 py-2 rounded-lg transition-colors md:cursor-pointer">
      Become User Pro
    </button>
  );
}