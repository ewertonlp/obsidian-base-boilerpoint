import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Obsidian Base | Ship your startup in days",
    template: "%s | Obsidian Base",
  },
  description: "The ultimate Next.js boilerplate with Supabase Auth, Stripe billing, and premium UI components out of the box.",
  metadataBase: new URL(APP_URL),
  
  // Open Graph (Para Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Obsidian Base | Ship your startup in days",
    description: "Launch your SaaS faster with our premium Next.js boilerplate.",
    url: APP_URL,
    siteName: "Obsidian Base",
    images: [
      {
        url: "/og-image.png", // DICA: Crie uma imagem de 1200x630px e coloque na pasta /public
        width: 1200,
        height: 630,
        alt: "Obsidian Base Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Obsidian Base",
    description: "Ship your startup in days, not months.",
    images: ["/og-image.png"], // Usa a mesma imagem do OG
    creator: "@seutwitter", // Opcional
  },
  
  // Ícones (Favicon e Apple Touch)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
