"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MenuSearch({ value, onChange }: Props) {
  return (
    <div className="relative mb-8">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search menu items..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          bg-white
          py-3
          pl-11
          pr-4
          outline-none
          transition
          focus:border-[#B45309]
          focus:ring-2
          focus:ring-amber-200
        "
      />
    </div>
  );
}
