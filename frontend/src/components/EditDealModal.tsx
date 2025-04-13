'use client';
import React, { useState, useEffect } from 'react';

export default function EditDealModal({ deal, onClose, onSave }: any) {
  const [formData, setFormData] = useState(deal);

  useEffect(() => {
    setFormData(deal);
  }, [deal]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/deals/${deal._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const updatedDeal = await response.json();
      onSave(updatedDeal);
      onClose();
    } catch (err) {
      console.error('Error updating deal:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Deal</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          placeholder="Deal Title"
        />
        <input
          name="value"
          value={formData.value}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          placeholder="Deal Value"
        />
        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
        >
          <option value="Initial Contact">Initial Contact</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed">Closed</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        >
          <option value="In Progress">In Progress</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
