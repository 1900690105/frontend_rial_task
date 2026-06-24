type Props = {
  soldOut: boolean;
  blurb: string;
  specialItem?: {
    id: string;
    name: string;
    description?: string;
    price: number;
    tags: string[];
  };
};

export default function SpecialBanner({ soldOut, specialItem, blurb }: Props) {
  if (!specialItem) return null;

  return (
    <section
      aria-labelledby="today-special-title"
      className="
        mb-12
        rounded-3xl
        border-l-4
        border-[#B45309]
        bg-amber-50
        p-6
      "
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#B45309]">
        Today&apos;s Special
      </p>

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="today-special-title"
            className="mb-2 text-2xl font-bold text-stone-900"
          >
            {specialItem.name}
          </h2>

          {!soldOut && (
            <p className="sr-only">
              Today&#39;s featured menu item is {specialItem.name} priced at €
              {specialItem.price.toFixed(2)}.
            </p>
          )}

          {soldOut ? (
            <>
              <span
                role="status"
                aria-live="polite"
                className="mb-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
              >
                Sold Out
              </span>

              <p className="text-gray-700">
                Today&apos;s special has sold out.
              </p>
            </>
          ) : (
            <p className="text-gray-700">{blurb}</p>
          )}
        </div>

        <div className="text-right">
          <p
            className="text-2xl font-bold text-[#B45309]"
            aria-label={`Price €${specialItem.price.toFixed(2)}`}
          >
            €{specialItem.price.toFixed(2)}
          </p>

          <button
            type="button"
            aria-label={`Order ${specialItem.name}`}
            disabled={soldOut}
            className="
              mt-3
              rounded-2xl
              bg-[#B45309]
              px-4
              py-2
              text-white
              transition
              hover:bg-[#923f07]
              focus:outline-none
              focus:ring-2
              focus:ring-[#B45309]
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
