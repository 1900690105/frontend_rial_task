"use client";

import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  item: any;
  open: boolean;
  onClose: () => void;
};

export default function FoodModal({ item, open, onClose }: Props) {
  if (!open || !item) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-999
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        w-full
        max-w-2xl
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        animate-in
        fade-in
        zoom-in-95
        "
      >
        <div className="relative h-72 w-full">
          <Image
            src={item.image || "/menu/placeholder.jpg"}
            alt={item.name}
            fill
            className="object-cover"
          />

          <button
            onClick={onClose}
            className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white/90
            p-2
            shadow
            "
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-3xl font-bold">{item.name}</h2>

            <span className="text-2xl font-bold text-[#B45309]">
              €{item.price.toFixed(2)}
            </span>
          </div>

          <p className="mb-6 text-slate-600">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag: string) => (
              <span
                key={tag}
                className="
                  rounded-full
                  bg-amber-100
                  px-3
                  py-1
                  text-sm
                  "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
