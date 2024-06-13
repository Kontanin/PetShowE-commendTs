// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-full overflow-y-auto">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
