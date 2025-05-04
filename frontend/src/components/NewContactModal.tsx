'use client';
import { useState } from 'react';
import api from '@/lib/api';

interface NewContact {
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  notes: string;
}

interface NewContactModalProps {
  onClose: () => void;
  onContactAdded: (contact: NewContact & { _id: string }) => void;
}

export default function NewContactModal({
  onClose,
  onContactAdded,
}: NewContactModalProps) {
  const [contact, setContact] = useState<NewContact>({
    name: '',
    email: '',
    phone: '',
    company: '',
    tags: [],
    notes: '',
  });
  const [tagInput, setTagInput] = useState('');

  // handle any text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  // add a tag when user hits Enter
  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setContact(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    try {
      // Post to /contacts (proxy will rewrite to your Express)
      const res = await api.post<NewContact & { _id: string }>('/contacts', contact);
      onContactAdded(res.data);
      onClose();
    } catch (err: any) {
      console.error('❌ Error creating contact:', err.response || err);
      alert(
        'Failed to create contact: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">New Contact</h3>
        <input
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={contact.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="company"
          placeholder="Company"
          value={contact.company}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <div className="mb-3">
          <label className="block mb-1">Tags (press Enter to add)</label>
          <input
            name="tags"
            placeholder="e.g. Investor"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            className="w-full p-2 border rounded"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {contact.tags.map(t => (
              <span key={t} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <textarea
          name="notes"
          placeholder="Notes"
          value={contact.notes}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
