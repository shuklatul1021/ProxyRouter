import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenRouter - Unified AI Model Gateway",
  description:
    "A black and white AI routing console for model discovery, API keys, credits, provider fallback, and usage analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
