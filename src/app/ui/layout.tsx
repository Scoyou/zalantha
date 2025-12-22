export default function Layout({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  const panelClasses =
    variant === "dark"
      ? "surface-panel surface-panel--night"
      : "surface-panel surface-panel--deep";
  const contentClasses =
    variant === "dark" ? "text-mist/85" : "text-ink/80";

  return (
    <div className="relative min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className={`${panelClasses} w-full rounded-[32px] px-6 py-10 md:px-12 md:py-12`}>
          <div className={`space-y-6 text-[0.98rem] leading-relaxed ${contentClasses}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
