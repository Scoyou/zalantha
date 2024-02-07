export const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p>Thank you! we&apos;ll get back to you as soon as possible.</p>
        <button
          onClick={onClose}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-amber-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};
