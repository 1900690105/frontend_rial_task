"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import Image from "next/image";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Navbar({ search, setSearch }: Props) {
  const [open, setOpen] = useState(false);

  const activeSection = useActiveSection();

  const navItems = [
    {
      label: "Brunch",
      href: "#brunch",
    },
    {
      label: "Sandwiches",
      href: "#sandwiches",
    },
    {
      label: "Drinks",
      href: "#drinks",
    },
    {
      label: "Sides",
      href: "#sides",
    },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:absolute
          focus:left-4
          focus:top-4
          focus:z-100
          focus:rounded-lg
          focus:bg-white
          focus:px-4
          focus:py-2
          focus:shadow-lg
        "
      >
        Skip to main content
      </a>

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-amber-100
          bg-[#FFFDF8]/90
          backdrop-blur-xl
          shadow-sm
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Cardamom House Home"
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                shrink-0
              "
            >
              <Image
                src="/logo1.png"
                alt="Cardamom House logo"
                width={64}
                height={64}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-3 lg:flex"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#B45309]
                      ${
                        isActive
                          ? `
                            bg-[#B45309]
                            text-white
                          `
                          : `
                            text-slate-700
                            hover:bg-amber-50
                            hover:text-[#B45309]
                          `
                      }
                    `}
                  >
                    {item.label}
                  </a>
                );
              })}

              {/* Search */}
              <div role="search" className="relative ml-2 w-64">
                <label htmlFor="desktop-menu-search" className="sr-only">
                  Search menu items
                </label>

                <Search
                  size={16}
                  aria-hidden="true"
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="desktop-menu-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search menu..."
                  autoComplete="off"
                  className="
                    h-10
                    w-full
                    rounded-full
                    border
                    border-[#B45309]
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    outline-none
                    transition
                    focus:ring-2
                    focus:ring-amber-200
                  "
                />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() => setOpen(!open)}
              className="
                rounded-lg
                p-2
                hover:bg-amber-50
                focus:outline-none
                focus:ring-2
                focus:ring-[#B45309]
                lg:hidden
              "
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {open && (
            <div id="mobile-menu" className="border-t py-4 lg:hidden">
              <div role="search" className="relative mb-4">
                <label htmlFor="mobile-menu-search" className="sr-only">
                  Search menu items
                </label>

                <Search
                  size={16}
                  aria-hidden="true"
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="mobile-menu-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search menu..."
                  autoComplete="off"
                  className="
                    h-10
                    w-full
                    rounded-full
                    border
                    border-amber-100
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-amber-200
                  "
                />
              </div>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-medium
                        transition
                        ${
                          isActive
                            ? `
                              bg-[#B45309]
                              text-white
                            `
                            : `
                              hover:bg-amber-50
                            `
                        }
                      `}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
