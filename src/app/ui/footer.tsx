export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-brass/40 bg-parchment/85 px-6 py-6 text-center text-sm text-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:flex-row">
          <p className="font-display tracking-[0.2em] uppercase text-ink/85">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
          <p className="text-xs text-ink/75 md:ml-3">
          Favicon by{" "}
            <a href="https://icons8.com" className="text-ink/80">
            Icons 8
          </a>
        </p>
        </div>
      </div>
        <div className="flex items-center">
        <a
          href="https://www.facebook.com/groups/1575524973263344/"
            className="text-ink/85 transition-colors duration-300 hover:text-ember"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};
