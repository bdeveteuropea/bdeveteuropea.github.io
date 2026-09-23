import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bde-veteuropea.alex-prt.chatgpt.site"),
  title: "BDE Veteuropea Madrid",
  description:
    "Veteuropea, le BDE des étudiants vétérinaires à Madrid. Événements, rencontres et vie étudiante à l’Universidad Europea.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BDE Veteuropea Madrid",
    description: "La vie véto. En plus grand.",
    url: "/",
    siteName: "BDE Veteuropea Madrid",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BDE Veteuropea Madrid — La vie véto. En plus grand.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BDE Veteuropea Madrid",
    description: "La vie véto. En plus grand.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
