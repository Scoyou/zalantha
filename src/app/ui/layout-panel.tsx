export default function Layout({
  children,
  variant = "light",
  className = "",
  wrapperClassName = "",
  panelClassName = "",
  contentClassName = "",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
  wrapperClassName?: string;
  panelClassName?: string;
  contentClassName?: string;
}) {
  const panelClasses =
    variant === "dark"
      ? "surface-panel surface-panel--night ornate-frame ornate-frame--night"
      : "surface-panel surface-panel--deep ornate-frame";
  const contentClasses = variant === "dark" ? "text-mist" : "text-ink/90";

  return (
    <div className={`relative min-h-screen px-4 py-10 md:px-6 md:py-16 ${className}`}>
      <div className={`mx-auto flex w-full max-w-5xl items-center justify-center ${wrapperClassName}`}>
        <div className={`${panelClasses} w-full rounded-2xl px-4 py-8 md:rounded-[32px] md:px-12 md:py-12 ${panelClassName}`}>
          <div className={`space-y-6 text-[1rem] leading-relaxed ${contentClasses} ${contentClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
