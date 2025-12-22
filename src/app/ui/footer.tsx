export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-brass/20 bg-night/90 px-6 py-6 text-center text-sm text-brass/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:flex-row">
          <p className="font-display tracking-[0.2em] uppercase text-brass">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
          <p className="text-xs text-brass/70 md:ml-3">
          Favicon by{" "}
            <a href="https://icons8.com" className="text-brass/90">
            Icons 8
          </a>
        </p>
        </div>
      </div>
        <div className="flex items-center">
        <a
          href="https://www.facebook.com/groups/1575524973263344/"
            className="text-brass/90 transition-colors duration-300 hover:text-amber-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};
