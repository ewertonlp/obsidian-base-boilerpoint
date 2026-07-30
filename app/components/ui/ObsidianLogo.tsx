"use client";

import Link from "next/link";
import Image from "next/image";

export default function ObsidianLogo() {
  return (
    <div className="flex items-center justify-center py-2">
      <Link href="#">
        <div className="flex items-center gap-3">
          {/* Container com Glassmorphism Discreto */}
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-black/75 border border-accent-blue/50 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <Image
              src="/obsidian-base-logo.png"
              alt="Logo Obsidian"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-wide text-text-primary ">
            Obsidian Base
          </span>
        </div>
      </Link>
    </div>
  );
}
