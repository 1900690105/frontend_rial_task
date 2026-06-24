"use client";

import { useEffect, useMemo, useState } from "react";
import MenuSection from "./MenuSection";

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: string[];
};

type Category = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

type Props = {
  categories: Category[];
  state: string;
  search: string;
};

export default function MenuContent({ categories, state, search }: Props) {
  const [filter, setFilter] = useState<"all" | "vegetarian" | "gluten-free">(
    "all",
  );

  const filteredCategories = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const nameMatch =
            searchTerm === "" || item.name.toLowerCase().includes(searchTerm);

          const descriptionMatch =
            searchTerm === "" ||
            item.description?.toLowerCase().includes(searchTerm) ||
            false;

          const tagMatch =
            searchTerm === "" ||
            item.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

          const searchMatch = nameMatch || descriptionMatch || tagMatch;

          const filterMatch =
            filter === "all"
              ? true
              : filter === "vegetarian"
                ? item.tags.includes("V")
                : item.tags.includes("GF");

          return searchMatch && filterMatch;
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [search, filter, categories]);

  const totalItems = useMemo(() => {
    return filteredCategories.reduce(
      (sum, category) => sum + category.items.length,
      0,
    );
  }, [filteredCategories]);

  useEffect(() => {
    if (search.trim().length < 3) return;

    const firstCategory = filteredCategories[0];

    if (!firstCategory) return;

    const section = document.getElementById(firstCategory.id);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [search, filteredCategories]);

  const filterButtonClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:ring-offset-2 ${
      active
        ? "bg-[#B45309] text-white"
        : "border border-stone-200 bg-white hover:bg-amber-50"
    }`;

  return (
    <section id="menu" aria-labelledby="menu-heading" className="scroll-mt-24">
      {/* SEO Heading */}
      <div className="mb-8">
        <h2
          id="menu-heading"
          className="text-3xl font-bold tracking-tight text-stone-900"
        >
          Our Menu
        </h2>

        <p className="mt-2 text-stone-600">
          Explore our freshly prepared dishes, beverages, vegetarian options,
          and daily specials.
        </p>
      </div>

      {/* Result Counter */}
      <p
        role="status"
        aria-live="polite"
        className="mb-6 text-sm text-stone-600"
      >
        Showing {totalItems} menu item
        {totalItems !== 1 ? "s" : ""}
      </p>

      {/* Filter Navigation */}
      <nav aria-label="Menu filters" className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
          className={filterButtonClass(filter === "all")}
        >
          All Items
        </button>

        <button
          type="button"
          aria-pressed={filter === "vegetarian"}
          onClick={() => setFilter("vegetarian")}
          className={filterButtonClass(filter === "vegetarian")}
        >
          Vegetarian
        </button>

        <button
          type="button"
          aria-pressed={filter === "gluten-free"}
          onClick={() => setFilter("gluten-free")}
          className={filterButtonClass(filter === "gluten-free")}
        >
          Gluten Free
        </button>
      </nav>

      {/* No Results */}
      {filteredCategories.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-stone-200 bg-white p-8 text-center"
        >
          <h3 className="mb-2 text-lg font-semibold text-stone-900">
            No items found
          </h3>

          <p className="text-stone-600">
            Try another search term or adjust the filters.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <MenuSection
              key={category.id}
              id={category.id}
              title={category.name}
              description={category.description}
              items={category.items}
              soldOutSpecial={state === "special-sold-out"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
