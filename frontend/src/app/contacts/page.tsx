'use client';
import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import ContactCard from '@/components/ContactCard';
import NewContactModal from '@/components/NewContactModal';
import EditContactModal from '@/components/EditContactModal';
import ContactDetailModal from '@/components/ContactDetailModal';

interface Contact {
  _id:    string;
  name?:  string;
  email?: string;
  phone?: string;
  company?: string;
  tags?:  string[];
  notes?: string;
}

export default function ContactsPage() {
  const { token } = useAuth();

  const [contacts, setContacts]     = useState<Contact[]>([]);
  const [showNew, setShowNew]       = useState(false);
  const [showDetail, setShowDetail] = useState<Contact | null>(null);
  const [editing, setEditing]       = useState<Contact | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag]   = useState('');

  // 1) Fetch contacts once we're authenticated
  useEffect(() => {
    if (!token) return;
    api.get<Contact[]>('/contacts')
      .then(res => setContacts(res.data))
      .catch(err => {
        console.error('Fetch contacts failed:', err.response || err);
        alert(`Error loading contacts (${err.response?.status}): ${err.response?.data?.message || err.message}`);
      });
  }, [token]);

  // 2) Build unique tag list
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    contacts.forEach(c => c.tags?.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [contacts]);

  // 3) Filter contacts safely
  const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return contacts.filter(c => {
      const nameLower  = (c.name  ?? '').toLowerCase();
      const emailLower = (c.email ?? '').toLowerCase();
      const matchSearch = nameLower.includes(term) || emailLower.includes(term);
      const matchTag    = filterTag ? c.tags?.includes(filterTag) : true;
      return matchSearch && matchTag;
    });
  }, [contacts, searchTerm, filterTag]);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Contacts</h2>
        {/* <-- New Contact button */}
        <button
          onClick={() => setShowNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Contact
        </button>
      </div>

      {/* Search & Filter */}
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
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* New Contact Modal */}
      {showNew && (
        <NewContactModal
          onClose={() => setShowNew(false)}
          onContactAdded={contact => {
            setContacts(cs => [...cs, contact]);
            setShowNew(false);
          }}
        />
      )}

      {/* Detail & Edit Modals */}
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
            setEditing(ed => ed && ({
              ...ed,
              [name]: name === 'tags'
                ? value.split(',').map(t => t.trim())
                : value
            }));
          }}
          onSave={async () => {
            if (!editing) return;
            try {
              const res = await api.put<Contact>(`/contacts/${editing._id}`, editing);
              setContacts(cs => cs.map(c => c._id === res.data._id ? res.data : c));
              setEditing(null);
            } catch (err: any) {
              console.error('Update failed:', err.response || err);
              alert(`Error updating contact (${err.response?.status}): ${err.response?.data?.message || err.message}`);
            }
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((c, idx) => (
          <ContactCard
            key={c._id ?? idx}      // use _id or fallback to index
            contact={c}
            onClick={() => setShowDetail(c)}
            onEdit={() => setEditing(c)}
            onDelete={async id => {
              if (!confirm('Delete this contact?')) return;
              try {
                await api.delete(`/contacts/${id}`);
                setContacts(cs => cs.filter(x => x._id !== id));
              } catch (err: any) {
                console.error('Delete failed:', err.response || err);
                alert(`Error deleting (${err.response?.status}): ${err.response?.data?.message || err.message}`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
