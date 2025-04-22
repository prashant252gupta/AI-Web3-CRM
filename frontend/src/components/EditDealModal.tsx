'use client';
import React from 'react';

interface Deal {
  _id: string;
  title: string;
  status: string;
  value: string;
  stage: string;
}

interface EditDealModalProps {
  editingDeal: Deal;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onUpdate: () => void;
  onCancel: () => void;
}

const EditDealModal: React.FC<EditDealModalProps> = ({
  editingDeal,
  onChange,
  onUpdate,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Deal</h3>

        <input
          name="title"
          placeholder="Title"
          value={editingDeal.title}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="status"
          value={editingDeal.status}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <input
          name="value"
          placeholder="Value"
          value={editingDeal.value}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="stage"
          value={editingDeal.stage}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Stage</option>
          <option value="Initial Contact">Initial Contact</option>
          <option value="Discovery">Discovery</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed">Closed</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={onUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDealModal;
