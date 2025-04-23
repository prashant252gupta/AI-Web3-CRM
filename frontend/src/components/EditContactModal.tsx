'use client';
import React, { useState, useEffect } from 'react';

interface Contact {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tags?: string[];
  notes?: string;
}

interface EditContactModalProps {
  contact: Contact;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({
  contact,
  onChange,
  onSave,
  onCancel
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
      <input
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={contact.email || ''}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={contact.phone || ''}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="company"
        placeholder="Company"
        value={contact.company || ''}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        name="tags"
        placeholder="Tags (comma-separated)"
        value={contact.tags?.join(',') || ''}
        onChange={onChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={contact.notes || ''}
        onChange={onChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </div>
  </div>
);

export default EditContactModal;
