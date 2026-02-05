import type { Metadata } from "next";
import GSAPRegistry from "@/components/providers/GSAPRegistry";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";
import { Urbanist, DM_Sans } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BaseLex | AI Governance Platform",
  description: "Enterprise standard for managing AI regulatory risk.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${dmSans.variable} antialiased font-sans bg-bg-page text-text-main`} suppressHydrationWarning>
        <GSAPRegistry>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </GSAPRegistry>
      </body>
    </html>
  );
}
