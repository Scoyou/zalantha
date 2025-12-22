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
    <nav className="sticky top-0 z-40 border-b border-brass/40 bg-parchment/80 backdrop-blur-xl shadow-[0_12px_30px_rgba(120,98,86,0.18)]">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4">
        <ul className="flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink font-display">
        <li>
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-ember"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/rules"
            className="transition-colors duration-300 hover:text-ember"
          >
            Rules
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="transition-colors duration-300 hover:text-ember"
          >
            Contact
          </Link>
        </li>
        <li className="relative">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-ember"
            onClick={toggleDropdown}
          >
            Get Started
          </a>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-1/2 top-12 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/70 bg-mapParchment/95 shadow-xl backdrop-blur animate-fade-in"
            >
              <ul className="divide-y divide-amber-100/50 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80">
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
