"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const isGetStartedActive = [
    "/get-started",
    "/history",
    "/factions",
    "/character-sheet",
    "/backend",
  ].includes(pathname);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    setIsDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
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
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    closeDropdown();
    closeMobileMenu();
  }, [pathname]);

  return (
    <nav
      className="nav-shell sticky top-0 z-40 border-b border-brass/40 bg-parchment/80 backdrop-blur-xl shadow-[0_12px_30px_rgba(120,98,86,0.18)]"
      aria-label="Primary"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-4">
        <button
          type="button"
          className="nav-hamburger absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center p-2 text-ink transition-colors duration-300 hover:text-ember focus:outline-none md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          {isMobileOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.3l6.29 6.3 6.3-6.3z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          )}
        </button>
        <ul className="hidden flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink font-display md:flex">
        <li>
          <Link
            href="/"
            className={`nav-link transition-colors duration-300 hover:text-ember ${
              isActive("/") ? "nav-link--active" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/rules"
            className={`nav-link transition-colors duration-300 hover:text-ember ${
              isActive("/rules") ? "nav-link--active" : ""
            }`}
          >
            Rules
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`nav-link transition-colors duration-300 hover:text-ember ${
              isActive("/contact") ? "nav-link--active" : ""
            }`}
          >
            Contact
          </Link>
        </li>
        <li className="relative">
          <button
            type="button"
            className={`nav-link transition-colors duration-300 hover:text-ember ${
              isGetStartedActive ? "nav-link--active" : ""
            }`}
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-controls="desktop-dropdown"
            aria-haspopup="true"
          >
            Get Started
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              id="desktop-dropdown"
              className="nav-dropdown absolute left-1/2 top-12 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/70 bg-mapParchment/95 shadow-xl backdrop-blur animate-fade-in"
            >
              <ul className="nav-dropdown-list divide-y divide-amber-100/50 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80">
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
                <li>
                  <Link
                    href="/backend"
                    className="block px-4 py-3 transition-colors duration-300 hover:text-ember"
                    onClick={closeDropdown}
                  >
                    Saved Characters
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        </ul>
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-sm transition-colors duration-300 hover:text-ember focus:outline-none md:right-4"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 14.32l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 4V1h-2v3h2zm0 19v-3h-2v3h2zm8-11h3v-2h-3v2zM1 12h3v-2H1v2zm15.24-7.16l1.42 1.42 1.79-1.8-1.41-1.41-1.8 1.79zM6.76 19.16l-1.42-1.42-1.79 1.8 1.41 1.41 1.8-1.79zM12 6a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M21 14.5A8.5 8.5 0 019.5 3a9 9 0 1011.5 11.5z" />
            </svg>
          )}
          <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </div>
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="nav-mobile fixed inset-x-0 top-16 z-30 flex h-[calc(100%-4rem)] flex-col items-center justify-start gap-6 bg-parchment/80 px-6 text-center backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={closeMobileMenu}
        >
          <ul
            className="nav-mobile-panel mt-6 w-full max-w-xs space-y-6 rounded-3xl border border-white/70 bg-white/75 px-8 py-10 text-lg font-semibold uppercase tracking-[0.25em] text-ink font-display shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <li>
              <Link
                href="/"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isActive("/") ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/rules"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isActive("/rules") ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Rules
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isActive("/contact") ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/get-started"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isGetStartedActive ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isGetStartedActive ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                World History
              </Link>
            </li>
            <li>
              <Link
                href="/factions"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isGetStartedActive ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Factions
              </Link>
            </li>
            <li>
              <Link
                href="/character-sheet"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isGetStartedActive ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Character Sheet
              </Link>
            </li>
            <li>
              <Link
                href="/backend"
                className={`nav-link transition-colors duration-300 hover:text-ember ${
                  isGetStartedActive ? "nav-link--active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Saved Characters
              </Link>
            </li>
            
          </ul>
        </div>
      )}
    </nav>
  );
};
