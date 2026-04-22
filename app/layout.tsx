import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ChairRadar | Find a Haircut Near You Fast",
    template: "%s | ChairRadar"
  },
  verification: {
    google: "Vw9myqX8OlyKcfUvRSAfE00UMDuKrcHaebJiTozf1yA"
  },
  description:
    "Find nearby haircut shops fast with call buttons, booking links, walk-in info, public shop pages, and directions on ChairRadar.",
  applicationName: "ChairRadar",
  keywords: [
    "ChairRadar",
    "haircut availability",
    "barber near me",
    "walk-in haircut",
    "open now haircut",
    "book haircut",
    "salon availability",
    "hair salon near me",
    "barbershop north carolina"
  ],
  openGraph: {
    title: "ChairRadar",
    description:
      "Find nearby haircut shops fast with call buttons, booking links, walk-in info, public shop pages, and directions.",
    url: SITE_URL,
    siteName: "ChairRadar",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
