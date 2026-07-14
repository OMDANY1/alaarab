import type { Metadata } from "next";
import { Cairo, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

/* ── Font Configuration ── */

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo-var",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk-var",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

/* ── Metadata ── */

export const metadata: Metadata = {
  title: "شاورما العراب — SHAWARMA AL-ARRAB | Brand Concept & Strategic Direction",
  description:
    "للصنعة عرّاب — Every Craft Has Its Master. A premium brand strategy presentation for Shawarma Al-Arrab, a contemporary Saudi fast-food brand built on 30+ years of craft mastery.",
  keywords: [
    "شاورما العراب",
    "Shawarma Al-Arrab",
    "brand strategy",
    "Saudi food brand",
    "للصنعة عرّاب",
  ],
  authors: [{ name: "AL-ARRAB Brand Studio" }],
  openGraph: {
    title: "SHAWARMA AL-ARRAB — Brand Concept",
    description: "Every Craft Has Its Master. للصنعة عرّاب",
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
  },
};

/* ── Root Layout ── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
