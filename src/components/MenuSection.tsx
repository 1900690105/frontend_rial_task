"use client";

import MenuItem from "./MenuItem";

type MenuItemType = {
  id: string;
  name: string;
  image?: string;
  description?: string;
  price: number;
  tags: string[];
};

type Props = {
  id: string;
  title: string;
  description?: string;
  items: MenuItemType[];
  soldOutSpecial?: boolean;
};

export default function MenuSection({
  id,
  title,
  description,
  items,
  soldOutSpecial = false,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 py-16"
    >
      {/* Category Header */}
      <header className="mb-10">
        <span
          aria-hidden="true"
          className="
            mb-3
            inline-block
            rounded-full
            bg-amber-100
            px-4
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#B45309]
          "
        >
          Menu
        </span>

        <h3
          id={`${id}-heading`}
          className="
            text-3xl
            sm:text-4xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          {title}
        </h3>

        {description && (
          <p
            className="
              mt-3
              max-w-2xl
              text-base
              sm:text-lg
              text-slate-600
              leading-relaxed
            "
          >
            {description}
          </p>
        )}
      </header>

      {/* Accessibility & SEO Context */}
      <p className="sr-only">
        {title} menu category with {items.length} menu item
        {items.length !== 1 ? "s" : ""}.
      </p>

      {/* Menu Grid */}
      <div
        role="list"
        aria-label={`${title} menu items`}
        className="grid gap-6 md:grid-cols-2"
      >
        {items.map((item) => (
          <div
            key={item.id}
            role="listitem"
            className="
              group
              rounded-3xl
              border
              border-amber-100
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-[#B45309]/20
              hover:shadow-xl
            "
          >
            <MenuItem
              item={item}
              soldOut={soldOutSpecial && item.id === "brunch_07"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
