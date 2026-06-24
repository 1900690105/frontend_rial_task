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

  useEffect(() => {
    if (!search.trim()) return;

    const firstCategory = filteredCategories[0];

    if (!firstCategory) return;

    const section = document.getElementById(firstCategory.id);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [search, filteredCategories]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "all"
              ? "bg-[#B45309] text-white"
              : "border hover:bg-amber-50"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("vegetarian")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "vegetarian"
              ? "bg-[#B45309] text-white"
              : "border hover:bg-amber-50"
          }`}
        >
          Vegetarian
        </button>

        <button
          onClick={() => setFilter("gluten-free")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "gluten-free"
              ? "bg-[#B45309] text-white"
              : "border hover:bg-amber-50"
          }`}
        >
          Gluten Free
        </button>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No items found</h3>

          <p className="text-gray-600">Try another search term or filter.</p>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <MenuSection
            key={category.id}
            id={category.id}
            title={category.name}
            description={category.description}
            items={category.items}
            soldOutSpecial={state === "special-sold-out"}
          />
        ))
      )}
    </>
  );
}
