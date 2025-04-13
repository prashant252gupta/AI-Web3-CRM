'use client';
import React, { useState } from 'react';

type NewContactModalProps = {
  onClose: () => void;
  onContactAdded: (newContact: any) => void;
};

export default function NewContactModal({
  onClose,
  onContactAdded,
}: NewContactModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    tags: '',
    notes: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((tag) => tag.trim()),
        }),
      });

      const data = await res.json();
      onContactAdded(data);
      onClose();
    } catch (err) {
      console.error('Error creating contact:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
        <h3 className="text-xl font-semibold mb-4">New Contact</h3>
        <div className="space-y-3">
          <input name="name" placeholder="Name" onChange={handleChange} className="input" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input" />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
          <input name="company" placeholder="Company" onChange={handleChange} className="input" />
          <input
            name="tags"
            placeholder="Tags (comma-separated)"
            onChange={handleChange}
            className="input"
          />
          <textarea
            name="notes"
            placeholder="Notes"
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
