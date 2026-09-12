import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0];
  const protocol = forwardedProtocol === "http" ? "http" : "https";
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const imageUrl = `${protocol}://${host}/og-v2.png`;

  return {
    title: "Nihon Notes · Japan 2026",
    description: "A 10-day winter itinerary through Tokyo, Kyoto, Osaka, and Shibu Onsen.",
    applicationName: "Nihon Notes",
    openGraph: {
      title: "Nihon Notes · Japan 2026",
      description: "Ten days through Tokyo, Kyoto, Osaka, and Shibu Onsen—planned day by day.",
      type: "website",
      images: [{ url: imageUrl, width: 1735, height: 907, alt: "Nihon Notes winter Japan route" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nihon Notes · Japan 2026",
      description: "Ten days through Tokyo, Kyoto, Osaka, and Shibu Onsen—planned day by day.",
      images: [imageUrl],
    },
  };
}

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
