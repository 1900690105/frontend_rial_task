"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import SpecialBanner from "@/components/SpecialBanner";
import MenuContent from "@/components/MenuContent";
import HoursBlock from "@/components/HoursBlock";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { restaurant } from "@/data/menu";
import { getCafeStatus, PageState } from "@/lib/menuHelpers";

type Props = {
  state: PageState;
};

export default function HomeClient({ state }: Props) {
  const [search, setSearch] = useState("");

  const status = getCafeStatus(state);

  const { today_special, categories } = restaurant;

  const specialItem = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === today_special.item_id);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Hero
          name={restaurant.restaurant.name}
          tagline={restaurant.restaurant.tagline}
          isOpen={status.isOpen}
          message={status.message}
          specialItem={specialItem}
        />

        {!status.isOpen && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-medium text-red-700">We&#39;re closed today.</p>

            <p className="text-red-600">{status.nextOpen}</p>
          </div>
        )}

        {specialItem && (
          <SpecialBanner
            soldOut={state === "special-sold-out"}
            specialItem={specialItem}
            blurb={restaurant.today_special.blurb}
          />
        )}
        <section id="menu">
          <MenuContent search={search} categories={categories} state={state} />
        </section>

        <HoursBlock
          hours={restaurant.restaurant.hours}
          currentDay={state === "closed" ? "monday" : "tuesday"}
        />

        <Footer
          address={restaurant.restaurant.address}
          phone={restaurant.restaurant.phone}
          instagram={restaurant.restaurant.instagram}
        />
      </main>
    </>
  );
}
