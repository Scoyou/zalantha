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
    <nav className="bg-darkWood border-black border-2 rounded py-3 text-center metamorphous-regular sticky top-0 shadow z-40">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/" className="text-amber-100 hover:text-amber-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/rules" className="text-amber-100 hover:text-amber-600">
            Rules
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-amber-100 hover:text-amber-600">
            Contact
          </Link>
        </li>
        <li className="relative">
          <a
            href="#"
            className="text-amber-100 hover:text-amber-600"
            onClick={toggleDropdown}
          >
            Get Started
          </a>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-8 left-0 bg-white border border-gray-300 rounded shadow lg:w-48 w-32"
            >
              <ul className="divide-y divide-gray-300">
                <li>
                  <Link
                    href="/get-started"
                    className="text-gray-800 hover:text-amber-600 block px-4 py-2"
                    onClick={closeDropdown}
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/history"
                    className="text-gray-800 hover:text-amber-600 block px-4 py-2"
                    onClick={closeDropdown}
                  >
                    World History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/factions"
                    className="text-gray-800 hover:text-amber-600 block px-4 py-2"
                    onClick={closeDropdown}
                  >
                    Factions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/character-sheet"
                    className="text-gray-800 hover:text-amber-600 block px-4 py-2"
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
    </nav>
  );
};
