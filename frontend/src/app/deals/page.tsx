'use client';
import { useState } from 'react';

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deals</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          + New Deal
        </button>
      </div>

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
