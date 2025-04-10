'use client';
import { useState } from 'react';

// 🆕 NewDealModal Component Inside Same File for Simplicity
function NewDealModal({ onClose, onSave }: {
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

// 🧠 Main Deals Page Component
const dummyDeals = [
  {
    title: 'Token Investment - DAOxyz',
    status: 'In Progress',
    value: '$50,000',
    stage: 'Negotiation',
  },
  {
    title: 'Advisory - NFT Project',
    status: 'Won',
    value: '$10,000',
    stage: 'Closed',
  },
  {
    title: 'Grant - Web3 Social',
    status: 'Lost',
    value: '$5,000',
    stage: 'Initial Contact',
  },
];

export default function DealsPage() {
  const [deals, setDeals] = useState(dummyDeals);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (newDeal: any) => {
    setDeals((prev) => [...prev, newDeal]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deals</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + New Deal
        </button>
      </div>

      {showModal && (
        <NewDealModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 
              border-blue-500 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-1">{deal.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Stage: {deal.stage}</p>
            <p className="text-sm text-gray-600 mb-1">Status: {deal.status}</p>
            <p className="text-md font-bold text-green-700">{deal.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
