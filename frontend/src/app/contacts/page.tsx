'use client';
import { useEffect, useState } from 'react';
import ContactCard from '@/components/ContactCard';
import NewContactModal from '@/components/NewContactModal';
import ContactDetailModal from '@/components/ContactDetailModal';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/contacts');
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowNewModal(true)}
        >
          + New Contact
        </button>
      </div>

      {showNewModal && (
        <NewContactModal
          onClose={() => setShowNewModal(false)}
          onContactAdded={(newContact: any) =>
            setContacts((prev) => [...prev, newContact])
          }
        />
      )}

      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onClick={() => setSelectedContact(contact)}
          />
        ))}
      </div>
    </div>
  );
}
