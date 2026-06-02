import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const historiaSkyScript = localFont({
  src: "../fonts/HistoriaSkyScript.woff2",
  variable: "--font-historia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anh (Talia) Nguyen — Influencer Partnership Specialist",
  description:
    "A thoughtful process of crafting experiences that engage people, shape clarity, and spark delights.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-icon.png",
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
      className={`${ibmPlexMono.variable} ${jetbrainsMono.variable} ${historiaSkyScript.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
