"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MenuSearch({ value, onChange }: Props) {
  return (
    <div role="search" aria-label="Search menu items" className="relative mb-8">
      <label htmlFor="menu-search" className="sr-only">
        Search menu items
      </label>

      <Search
        size={18}
        aria-hidden="true"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        id="menu-search"
        type="search"
        inputMode="search"
        autoComplete="off"
        spellCheck={false}
        placeholder="Search menu items..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby="menu-search-help"
        className="
          w-full
          rounded-xl
          border
          border-stone-200
          bg-white
          py-3
          pl-11
          pr-12
          outline-none
          transition
          focus:border-[#B45309]
          focus:ring-2
          focus:ring-amber-200
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-gray-400
            transition
            hover:text-gray-700
            focus:outline-none
            focus:ring-2
            focus:ring-[#B45309]
          "
        >
          <X size={16} />
        </button>
      )}

      <p id="menu-search-help" className="sr-only">
        Search menu items by name, description, or dietary tags.
      </p>
    </div>
  );
}
