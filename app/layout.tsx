import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
    creator: "@seutwitter", // Opcional
  },
  
  // Ícones (Favicon e Apple Touch)
  icons: {
    icon: "/favicon.png",
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
      className={`  ${poppins.variable} h-full antialiased scroll-smooth data-scroll-behavior="smooth" `}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
