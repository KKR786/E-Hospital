import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const modalRef = useRef(null);

  useEffect(() => {
    function checkClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", checkClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex
                        items-center justify-center
                        bg-black bg-opacity-50 z-10"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg
                            shadow-lg p-6 max-w-lg
                            w-full relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
