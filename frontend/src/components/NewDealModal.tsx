'use client';
import React from 'react';

interface ContactOption {
  _id: string;
  name: string;
}
interface NewDeal {
  title:    string;
  status:   string;
  value:    string;
  stage:    string;
  contactId?: string;
}

interface NewDealModalProps {
  contacts: ContactOption[];
  newDeal:  NewDeal;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  onClose:  () => void;
}

const NewDealModal: React.FC<NewDealModalProps> = ({
  contacts,
  newDeal,
  onChange,
  onSubmit,
  onClose
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">New Deal</h3>

      {/* Contact dropdown */}
      <select
        name="contactId"
        value={newDeal.contactId || ''}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Link to Contact…</option>
        {contacts.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Other fields */}
      <input
        name="title"
        placeholder="Title"
        value={newDeal.title}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        name="status"
        value={newDeal.status}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Select Status</option>
        <option value="In Progress">In Progress</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <input
        type="number"
        name="value"
        placeholder="Value"
        value={newDeal.value}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        name="stage"
        value={newDeal.stage}
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

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </div>
    </div>
  </div>
);

export default NewDealModal;
