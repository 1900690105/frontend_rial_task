"use client";

import { useState } from "react";
import Image from "next/image";
import Tag from "./Tag";

type Props = {
  item: {
    id: string;
    name: string;
    image?: string;
    description?: string;
    price: number;
    tags: string[];
  };
  soldOut?: boolean;
};

export default function MenuItem({ item, soldOut }: Props) {
  const [ordered, setOrdered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState<number | null>(null);

  const placeOrder = () => {
    const randomToken = Math.floor(Math.random() * 900) + 100;
    setToken(randomToken);
    setOrdered(true);
  };

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  return (
    <article
      id={item.id}
      aria-label={item.name}
      className={`
        h-full
        transition-all
        duration-500
        hover:-translate-y-1
        ${soldOut ? "opacity-50" : ""}
      `}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Image */}
        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
          <Image
            src={"/placeholder_image.png"}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-[#B45309]">
                  {item.name}
                </h3>

                {soldOut && (
                  <span
                    role="status"
                    className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                  >
                    Sold Out
                  </span>
                )}
              </div>

              <div className="mt-2 min-h-13">
                {item.description ? (
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                ) : (
                  <div />
                )}
              </div>
            </div>

            <span className="shrink-0 text-xl font-bold text-[#B45309]">
              €{item.price.toFixed(2)}
            </span>
          </div>

          {/* Tags + Controls: stack on mobile, row on larger screens */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {item.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Item tags">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Tag tag={tag} />
                  </li>
                ))}
              </ul>
            ) : (
              <div />
            )}

            {ordered ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-right sm:self-end"
              >
                <p className="text-xs text-slate-500">Order Confirmed</p>
                <p className="text-xs text-slate-500">Qty: {quantity}</p>
                <p className="text-sm text-slate-500">
                  Total: €{(item.price * quantity).toFixed(2)}
                </p>
                <p className="font-semibold text-[#B45309]">Token #{token}</p>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                {/* Quantity Selector */}
                <div
                  className="flex items-center overflow-hidden rounded-xl border border-amber-200"
                  role="group"
                  aria-label="Quantity selector"
                >
                  <button
                    type="button"
                    onClick={decreaseQty}
                    disabled={soldOut || quantity <= 1}
                    aria-label="Decrease quantity"
                    className="px-3 py-2 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span
                    className="min-w-10 text-center font-medium"
                    aria-live="polite"
                    aria-label={`Quantity: ${quantity}`}
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQty}
                    disabled={soldOut}
                    aria-label="Increase quantity"
                    className="px-3 py-2 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {/* Order Button */}
                <button
                  type="button"
                  disabled={soldOut}
                  onClick={placeOrder}
                  aria-label={
                    soldOut
                      ? `${item.name} is sold out`
                      : `Place order for ${item.name}`
                  }
                  className="
                    rounded-xl
                    bg-[#B45309]
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-[#92400e]
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:bg-gray-400
                    disabled:hover:scale-100
                    focus-visible:outline
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#B45309]
                  "
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
