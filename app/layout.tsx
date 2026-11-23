import type { Metadata } from "next";
import { Libre_Baskerville, Parisienne } from "next/font/google";
import "./globals.css";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Guillermo e Ingrit",
  description:
    "Queremos celebrar este día con ustedes. Abrí la invitación y confirmá tu asistencia.",
  applicationName: "Guillermo e Ingrit",
  openGraph: {
    title: "Guillermo e Ingrit",
    description:
      "Queremos celebrar este día con ustedes. Abrí la invitación y confirmá tu asistencia.",
    type: "website",
    locale: "es_ES",
    siteName: "Guillermo e Ingrit",
    url: siteUrl,
    images: [
      {
        url: "/og.jpg",
        width: 1080,
        height: 1080,
        alt: "Guillermo e Ingrit — 19 de diciembre de 2026",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guillermo e Ingrit",
    description:
      "Queremos celebrar este día con ustedes. Abrí la invitación y confirmá tu asistencia.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${libre.variable} ${parisienne.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}
