// Modal.tsx
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}