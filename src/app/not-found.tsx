import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        bg-[#FFFDF8]
        px-6
        text-center
      "
    >
      <p
        className="
          mb-2
          text-sm
          font-semibold
          uppercase
          tracking-[0.2em]
          text-[#B45309]
        "
      >
        404 Error
      </p>

      <h1
        className="
          mb-4
          text-5xl
          font-bold
          tracking-tight
          text-slate-900
          md:text-6xl
        "
      >
        Page Not Found
      </h1>

      <p
        className="
          mb-8
          max-w-md
          text-lg
          text-slate-600
        "
      >
        Sorry, the page you&#39;re looking for doesn&#39;t exist or has been
        moved.
      </p>

      <Link
        href="/"
        className="
          rounded-full
          bg-[#B45309]
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-[#92400e]
          focus:outline-none
          focus:ring-2
          focus:ring-[#B45309]
          focus:ring-offset-2
        "
      >
        Back to Home
      </Link>
    </main>
  );
}
