import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<ModalProps> = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Notification</h2>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
);

export default Notification;
