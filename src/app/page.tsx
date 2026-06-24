import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getPageState } from "@/lib/menuHelpers";

export const metadata: Metadata = {
  title: "Cardamom House | Slow Brunch & Specialty Coffee",
  description:
    "Discover handcrafted brunch, specialty coffee, fresh pastries, and daily specials at Cardamom House.",

  openGraph: {
    title: "Cardamom House",
    description:
      "Slow brunch. Strong coffee. Explore our menu and daily specials.",
    images: ["/hero.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cardamom House",
    description:
      "Slow brunch. Strong coffee. Explore our menu and daily specials.",
    images: ["/hero.png"],
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    state?: string;
  }>;
}) {
  const params = await searchParams;

  const state = getPageState(params.state);

  return <HomeClient state={state} />;
}
