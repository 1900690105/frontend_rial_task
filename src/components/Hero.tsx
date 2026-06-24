import Image from "next/image";

type HeroProps = {
  name: string;
  tagline: string;
  isOpen: boolean;
  message: string;
  specialItem?: {
    id: string;
    name: string;
    description?: string;
    price: number;
    tags: string[];
  };
};

export default function Hero({
  name,
  tagline,
  isOpen,
  message,
  specialItem,
}: HeroProps) {
  if (!specialItem) return null;
  return (
    <header className="relative overflow-hidden ">
      {/* Decorative background glow — brand-toned, not generic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full  opacity-[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full   "
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2 md:gap-12 lg:py-20">
        {/* Text column */}
        <div className="flex flex-col gap-4 sm:gap-5 order-2 md:order-1">
          {/* Accent line — small brand signature above the status badge */}

          <span
            role="status"
            aria-live="polite"
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium shadow-sm ring-1 transition-colors ${
              isOpen
                ? "bg-[#B45309]/10 text-[#B45309] ring-[#B45309]/30"
                : "bg-red-50 text-red-700 ring-red-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`relative flex h-2 w-2 rounded-full ${
                isOpen ? "bg-[#B45309]" : "bg-red-500"
              }`}
            >
              {isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B45309] opacity-60" />
              )}
            </span>
            <span className="sr-only">
              {isOpen ? "Status: Open. " : "Status: Closed. "}
            </span>
            {message}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-stone-900">
            {name}
          </h1>

          <p className="max-w-xl text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed">
            {tagline}
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#B45309] px-6 py-3 text-sm sm:text-base font-medium text-white shadow-sm transition hover:bg-[#923f07] focus:outline-none focus:ring-2 focus:ring-[#B45309]/40 focus:ring-offset-2">
              View Menu
            </button>
            <button className="rounded-full bg-white px-6 py-3 text-sm sm:text-base font-medium text-stone-900 ring-1 ring-stone-200 transition hover:bg-[#B45309]/5 hover:ring-[#B45309]/40">
              Reserve a Table
            </button>
          </div>
        </div>

        {/* Image column */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-4/3 w-full max-w-md overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#B45309]/15 md:max-w-none">
            <Image
              src="/hero.png"
              alt={`${name} — signature dish preview`}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
            {/* Today's special badge floating on the image, brand-colored */}
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#B45309]">
                Today&#39;s Special
              </p>
              <p className="text-sm font-semibold text-stone-900">
                {specialItem.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
