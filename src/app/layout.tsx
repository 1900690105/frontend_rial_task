import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cardamom House | Slow Brunch & Specialty Coffee",
  description:
    "Cardamom House is a modern café serving brunch, specialty coffee, fresh pastries, and handcrafted drinks in Lisbon.",

  keywords: [
    "Cardamom House",
    "Cafe",
    "Brunch",
    "Coffee",
    "Restaurant",
    "Lisbon Cafe",
    "Breakfast",
    "Specialty Coffee",
  ],

  authors: [
    {
      name: "Nikhil",
    },
  ],

  creator: "Nikhil",

  openGraph: {
    title: "Cardamom House",
    description:
      "Slow brunch. Strong coffee. Discover our handcrafted menu and daily specials.",
    type: "website",
    locale: "en_US",
    siteName: "Cardamom House",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Cardamom House",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cardamom House",
    description:
      "Slow brunch. Strong coffee. Discover our handcrafted menu and daily specials.",
    images: ["/hero.png"],
  },

  robots: {
    index: true,
    follow: true,
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
