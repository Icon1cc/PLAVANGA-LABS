import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.plavangalabs.com",
  ),
  title: {
    default: "Plavanga Labs | Software & AI Development",
    template: "%s | Plavanga Labs",
  },
  description:
    "Custom software development, AI integration, conversational AI, and workflow automation for ambitious product teams.",
  alternates: { canonical: "/" },
  keywords: [
    "software development",
    "AI integration",
    "machine learning",
    "chatbot development",
    "web application development",
    "workflow automation",
  ],
  openGraph: {
    title: "Plavanga Labs | Software & AI Development",
    description:
      "Custom software and applied AI built around real business problems.",
    type: "website",
    images: [
      {
        url: "/images/plavanga-ai-systems-hero.webp",
        width: 1672,
        height: 941,
        alt: "Plavanga Labs software and AI systems",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090d",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-ready')",
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
