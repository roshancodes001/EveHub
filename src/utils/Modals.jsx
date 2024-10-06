import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-md p-6 shadow-lg z-10">
        <h2 className="text-lg font-bold">Confirm Booking</h2>
        <p>Are you sure you want to book this appointment?</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
