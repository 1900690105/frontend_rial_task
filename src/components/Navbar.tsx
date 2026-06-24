"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
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

  return (
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
          {/* Brand */}
          <Link
            href="/"
            className="
            shrink-0
            text-xl
            font-bold
            tracking-tight
            text-[#B45309]
            md:text-2xl
            h-16
            w-16
            "
          >
            <Image src={"/logo1.png"} alt="logo" width={200} height={200} />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? `
                          bg-[#B45309]
                          text-white
                          shadow-amber-200
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

            <div className="relative ml-2 w-64">
              <Search
                size={16}
                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                "
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
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
                "
              />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              aria-label="Open Menu"
              onClick={() => setOpen(!open)}
              className="
              rounded-lg
              p-2
              hover:bg-amber-50
              "
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="border-t py-4 lg:hidden">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search
                size={16}
                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                "
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
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
                "
              />
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");

                return (
                  <a
                    key={item.href}
                    href={item.href}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
