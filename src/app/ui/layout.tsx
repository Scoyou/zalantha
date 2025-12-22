export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="surface-panel surface-panel--deep w-full rounded-[32px] px-6 py-10 md:px-12 md:py-12">
          <div className="space-y-6 text-[0.98rem] leading-relaxed text-ink/80">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
