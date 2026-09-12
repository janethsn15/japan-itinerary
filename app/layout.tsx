import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nihon Notes · Japan 2026",
  description: "A 10-day winter itinerary through Tokyo, Nagano, Kyoto, and Osaka.",
  applicationName: "Nihon Notes",
  openGraph: {
    title: "Nihon Notes · Japan 2026",
    description: "Ten days through Tokyo, Nagano, Kyoto, and Osaka—planned day by day.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nihon Notes · Japan 2026",
    description: "Ten days through Tokyo, Nagano, Kyoto, and Osaka—planned day by day.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
