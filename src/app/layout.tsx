import type { Metadata, Viewport } from "next";
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
  title: "Talia Nguyen — Influencer Partnership Specialist",
  description:
    "A dynamic young marketer who transforms influencer campaigns into a thoughtful process of crafting experiences shaping clarity for brands and sparking genuine delight for audiences.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-icon.png",
  },
};

// NOTE: Essential viewport configuration for mobile responsiveness
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents auto-zooming that breaks the layout on mobile devices
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