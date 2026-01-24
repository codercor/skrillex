import type { Metadata } from "next";
import GSAPRegistry from "@/components/providers/GSAPRegistry";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

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
      <body className={`antialiased`} suppressHydrationWarning>
        <GSAPRegistry>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </GSAPRegistry>
      </body>
    </html>
  );
}
