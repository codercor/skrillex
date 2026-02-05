import type { Metadata } from "next";
import GSAPRegistry from "@/components/providers/GSAPRegistry";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaseLex | AI Governance Platform",
  description: "Enterprise standard for managing AI regulatory risk.",
};

import { Syne, Space_Grotesk } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${spaceGrotesk.variable} antialiased font-sans bg-bg-page text-text-main`} suppressHydrationWarning>
        <GSAPRegistry>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </GSAPRegistry>
      </body>
    </html>
  );
}
