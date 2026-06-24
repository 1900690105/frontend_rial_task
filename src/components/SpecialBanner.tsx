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
        Today&#39;s Special
      </p>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold">{specialItem.name}</h2>

          {soldOut ? (
            <>
              <span className="mb-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                Sold Out
              </span>

              <p className="text-gray-700">Today&#39;s special has sold out.</p>
            </>
          ) : (
            <p className="text-gray-700">{blurb}</p>
          )}
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-[#B45309]">
            €{specialItem.price.toFixed(2)}
          </p>
          <button className="bg-[#B45309] p-2 rounded-2xl text-white m-2 mx-auto">
            🧺 Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
