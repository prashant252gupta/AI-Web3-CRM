'use client';
import React from 'react';

interface Deal {
  _id: string;
  title: string;
  status: string;
  value: string | number;
  stage: string;
  contactId?: { 
    _id: string; 
    name: string; 
    email?: string;
  } | string | null;
}

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onEdit, onDelete }) => {
  // Only extract name when contactId is a non-null object
  const contactName =
    deal.contactId && typeof deal.contactId === 'object' 
      ? deal.contactId.name 
      : 'Unassigned';

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-lg transition relative">
      <h3 className="text-lg font-semibold mb-1">{deal.title}</h3>

      {/* Linked contact */}
      <p className="text-sm text-gray-700 mb-1">
        Contact: {contactName}
      </p>

      <p className="text-sm text-gray-600 mb-1">Stage: {deal.stage}</p>
      <p className="text-sm text-gray-600 mb-1">Status: {deal.status}</p>
      <p className="text-md font-bold text-green-700">{deal.value}</p>

      {/* Edit Button */}
      <button
        onClick={() => onEdit(deal)}
        className="absolute top-2 right-14 text-xs px-2 py-1 bg-gray-200 rounded"
      >
        Edit
      </button>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(deal._id)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xs px-2 py-1 bg-gray-100 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default DealCard;
