'use client';
import { useState } from 'react';

export default function NewDealModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (deal: {
    title: string;
    value: string;
    stage: string;
    status: string;
  }) => void;
}) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState('Initial Contact');
  const [status, setStatus] = useState('In Progress');

  const handleSubmit = () => {
    onSave({ title, value, stage, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Deal</h2>

        <input
          type="text"
          placeholder="Deal Title"
          className="w-full mb-3 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Value ($)"
          className="w-full mb-3 p-2 border rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        >
          <option>Initial Contact</option>
          <option>Negotiation</option>
          <option>Due Diligence</option>
          <option>Closed</option>
        </select>

        <select
          className="w-full mb-4 p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>In Progress</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-gray-600 px-4 py-2 rounded hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
