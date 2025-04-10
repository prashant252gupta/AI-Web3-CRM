'use client';
import React from 'react';

export default function ContactDetailModal({
  contact,
  onClose,
}: {
  contact: {
    name: string;
    wallet: string;
    tags: string[];
  };
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{contact.name}</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">×</button>
        </div>
        <p className="mb-2"><strong>Wallet:</strong> {contact.wallet}</p>
        <p className="mb-4"><strong>Tags:</strong> {contact.tags.join(', ')}</p>
        
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
