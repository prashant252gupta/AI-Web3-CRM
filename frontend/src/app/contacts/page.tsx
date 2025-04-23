'use client';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ContactCard from '@/components/ContactCard';
import NewContactModal from '@/components/NewContactModal';
import EditContactModal from '@/components/EditContactModal';
import ContactDetailModal from '@/components/ContactDetailModal';

interface Contact {
  _id:    string;
  name:   string;
  email?: string;
  phone?: string;
  company?:string;
  tags?:  string[];
  notes?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [showDetail, setShowDetail] = useState<Contact | null>(null);
  const [editing, setEditing] = useState<Contact | null>(null);

  // search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    axios.get<Contact[]>('http://localhost:5000/api/contacts')
      .then(res => setContacts(res.data))
      .catch(console.error);
  }, []);

  // unique tag list
  const allTags = useMemo(() => {
    const setTags = new Set<string>();
    contacts.forEach(c => c.tags?.forEach(t => setTags.add(t)));
    return Array.from(setTags);
  }, [contacts]);

  // filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchTag = filterTag ? c.tags?.includes(filterTag) : true;
      return matchSearch && matchTag;
    });
  }, [contacts, searchTerm, filterTag]);

  // handlers omitted for brevity — use your existing create/edit/delete logic

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <button
          onClick={() => setShowNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Contact
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {showNew && (
        <NewContactModal
          onClose={() => setShowNew(false)}
          onContactAdded={contact => setContacts(c => [...c, contact])}
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
          onChange={e => {
            const { name, value } = e.target;
            setEditing({ ...editing, [name]:
              name === 'tags'
                ? value.split(',').map(t => t.trim())
                : value
            });
          }}
          onSave={async () => {
            if (!editing) return;
            const res = await axios.put(
              `http://localhost:5000/api/contacts/${editing._id}`,
              editing
            );
            setContacts(c => c.map(x => x._id === res.data._id ? res.data : x));
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map(c => (
          <ContactCard
            key={c._id}
            contact={c}
            onClick={() => setShowDetail(c)}
            onEdit={setEditing}
            onDelete={async id => {
              if (!confirm('Delete this contact?')) return;
              await axios.delete(`http://localhost:5000/api/contacts/${id}`);
              setContacts(ct => ct.filter(x => x._id !== id));
            }}
          />
        ))}
      </div>
    </div>
  );
}
