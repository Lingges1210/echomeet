import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "EchoMeet — Turn meeting chaos into clarity",
  description:
    "Paste your messy meeting notes and get structured action items, decisions, and a ready-to-send follow-up email in seconds. Built with AI.",
  keywords: [
    "meeting notes",
    "AI meeting assistant",
    "action items",
    "meeting summary",
    "productivity",
  ],
  openGraph: {
    title: "EchoMeet — Turn meeting chaos into clarity",
    description:
      "Paste your messy meeting notes and get structured action items, decisions, and a ready-to-send follow-up email in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          jetbrainsMono.variable,
          "font-sans antialiased min-h-screen bg-background"
        )}
      >
        {children}
      </body>
    </html>
  );
}
