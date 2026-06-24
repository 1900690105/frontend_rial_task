"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  item: {
    name: string;
    image?: string;
    description?: string;
    price: number;
    tags: string[];
  };
  open: boolean;
  onClose: () => void;
};

export default function FoodModal({ item, open, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";

      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

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
      p-4
      backdrop-blur-sm
      "
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-modal-title"
        aria-describedby="food-modal-description"
        onClick={(e) => e.stopPropagation()}
        className="
        w-full
        max-w-2xl
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        "
      >
        {/* Image */}

        <div className="relative h-64 sm:h-80 w-full">
          <Image
            src={item.image || "/placeholder_image.png"}
            alt={item.name}
            fill
            priority
            className="object-cover"
          />

          <button
            onClick={onClose}
            aria-label="Close food details"
            className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white/90
            p-2
            shadow-md
            transition
            hover:bg-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2
              id="food-modal-title"
              className="
              text-2xl
              font-bold
              text-slate-900
              sm:text-3xl
              "
            >
              {item.name}
            </h2>

            <span
              className="
              shrink-0
              text-xl
              font-bold
              text-[#B45309]
              sm:text-2xl
              "
            >
              €{item.price.toFixed(2)}
            </span>
          </div>

          <p
            id="food-modal-description"
            className="
            mb-6
            leading-relaxed
            text-slate-600
            "
          >
            {item.description || "No description available."}
          </p>

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                  rounded-full
                  bg-amber-100
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-amber-800
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
