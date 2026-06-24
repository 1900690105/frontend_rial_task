"use client";

import MenuItem from "./MenuItem";

type Props = {
  id: string;
  title: string;
  description?: string;
  items: any[];
  soldOutSpecial?: boolean;
};

export default function MenuSection({
  id,
  title,
  description,
  items,
  soldOutSpecial,
}: Props) {
  return (
    <section id={id} className="scroll-mt-28 py-16">
      {/* Section Header */}
      <div className="mb-10 ">
        <span className="mb-3 inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#B45309]">
          Menu
        </span>

        <h2 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        {description && (
          <p className=" mt-3 max-w-2xl text-lg text-slate-600">
            {description}
          </p>
        )}
      </div>

      {/* Premium Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
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
