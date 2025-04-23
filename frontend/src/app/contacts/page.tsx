'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactCard from '@/components/ContactCard';
import NewContactModal from '@/components/NewContactModal';
import EditContactModal from '@/components/EditContactModal';
import ContactDetailModal from '@/components/ContactDetailModal';

interface Contact {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tags?: string[];
  notes?: string;
}

const API_BASE = 'http://localhost:5000/api/contacts';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [showDetail, setShowDetail] = useState<Contact | null>(null);
  const [editing, setEditing] = useState<Contact | null>(null);

  // 1️⃣ Fetch all contacts
  useEffect(() => {
    axios
      .get(API_BASE)
      .then(res => setContacts(res.data))
      .catch(console.error);
  }, []);

  // 2️⃣ Handlers for New Contact
  const handleNewSave = (newContact: Contact) =>
    setContacts(prev => [...prev, newContact]);

  // 3️⃣ Handlers for Edit Contact
  const handleEditChange = (e: any) => {
    if (!editing) return;
    const { name, value } = e.target;
    setEditing({
      ...editing,
      [name]:
        name === 'tags'
          ? value.split(',').map(t => t.trim())
          : value,
    });
  };

  const handleEditSave = async () => {
    if (!editing) return;
    try {
      const res = await axios.put(`${API_BASE}/${editing._id}`, editing);
      setContacts(contacts.map(c => (c._id === res.data._id ? res.data : c)));
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  // 4️⃣ Delete Contact
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <button
          onClick={() => setShowNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Contact
        </button>
      </div>

      {showNew && (
        <NewContactModal
          onClose={() => setShowNew(false)}
          onContactAdded={handleNewSave}
        />
      )}

      {showDetail && (
        <ContactDetailModal
          contact={showDetail}
          onClose={() => setShowDetail(null)}
        />
      )}

      {editing && (
        <EditContactModal
          contact={editing}
          onChange={handleEditChange}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(c => (
          <ContactCard
            key={c._id}
            contact={c}
            onClick={() => setShowDetail(c)}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
