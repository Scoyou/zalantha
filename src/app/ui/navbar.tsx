"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-brass/20 bg-night/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3">
        <ul className="flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-brass font-display">
        <li>
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-amber-100"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/rules"
            className="transition-colors duration-300 hover:text-amber-100"
          >
            Rules
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="transition-colors duration-300 hover:text-amber-100"
          >
            Contact
          </Link>
        </li>
        <li className="relative">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-amber-100"
            onClick={toggleDropdown}
          >
            Get Started
          </a>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-1/2 top-10 w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-xl backdrop-blur animate-fade-in"
            >
              <ul className="divide-y divide-stone-200 text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                <li>
                  <Link
                    href="/get-started"
                    className="block px-4 py-3 transition-colors duration-300 hover:text-ember"
                    onClick={closeDropdown}
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/history"
                    className="block px-4 py-3 transition-colors duration-300 hover:text-ember"
                    onClick={closeDropdown}
                  >
                    World History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/factions"
                    className="block px-4 py-3 transition-colors duration-300 hover:text-ember"
                    onClick={closeDropdown}
                  >
                    Factions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/character-sheet"
                    className="block px-4 py-3 transition-colors duration-300 hover:text-ember"
                    onClick={closeDropdown}
                  >
                    Character Sheet
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        </ul>
      </div>
    </nav>
  );
};
