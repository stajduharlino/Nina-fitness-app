import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--next-sans",
  subsets: ["latin", "latin-ext"],
});

const serif = Cormorant_Garamond({
  variable: "--next-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nina Gauš | Online coaching",
  description: "Online coaching s Ninom Gauš: treninzi, prehrana i praćenje napretka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hr" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
