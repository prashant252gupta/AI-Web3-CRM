'use client';
import { useState } from 'react';

export default function NewContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    console.log({ name, wallet, tags: tags.split(',') });
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
        <input
          className="w-full border px-3 py-2 mb-3 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 mb-3 rounded"
          placeholder="Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 mb-4 rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
