export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-brass/40 bg-parchment/85 px-4 py-6 text-sm text-ink/85 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="font-display tracking-[0.2em] uppercase text-ink/85">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
          <p className="text-xs text-ink/75">
            Favicon by{" "}
            <a href="https://icons8.com" className="text-ink/80">
              Icons 8
            </a>
          </p>
        </div>
        <div className="flex items-center">
          <a
            href="https://www.facebook.com/groups/1575524973263344/"
            className="text-ink/85 transition-colors duration-300 hover:text-ember"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              role="img"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
