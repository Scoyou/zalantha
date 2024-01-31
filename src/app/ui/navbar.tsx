import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-slate-800 border-black border-2 rounded py-3 text-center metamorphous-regular sticky top-0 shadow">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/" className="text-amber-100 hover:text-amber-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/history" className="text-amber-100 hover:text-amber-600">
            History
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
        <li>
          <Link
            href="/get-started"
            className="text-amber-100 hover:text-amber-600"
          >
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  );
};
