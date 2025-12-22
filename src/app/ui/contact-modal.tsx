export const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 backdrop-blur-sm">
      <div className="surface-panel surface-panel--deep mx-4 w-full max-w-md rounded-[28px] px-6 py-8 text-center">
        <p className="text-base text-ink">
          Thank you! we&apos;ll get back to you as soon as possible.
        </p>
        <button onClick={onClose} className="btn-primary mt-6 text-sm uppercase tracking-[0.2em]">
          Close
        </button>
      </div>
    </div>
  );
};
