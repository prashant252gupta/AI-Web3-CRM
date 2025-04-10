'use client';
import { useState } from 'react';
import ContactCard from '@/components/ContactCard';
import NewContactModal from '@/components/NewContactModal';
import ContactDetailModal from '@/components/ContactDetailModal';

const dummyContacts = [
  {
    name: 'Alice Nakamoto',
    wallet: '0x123...abcd',
    tags: ['Investor', 'Polygon', 'DAO'],
  },
  {
    name: 'Bob Web3',
    wallet: '0x456...efgh',
    tags: ['DeFi', 'Builder', 'Angel'],
  },
  {
    name: 'Charlie Ledger',
    wallet: '0x789...ijkl',
    tags: ['NFT', 'Advisor'],
  },
];

export default function ContactsPage() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

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
        <NewContactModal onClose={() => setShowNewModal(false)} />
      )}
      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyContacts.map((contact, index) => (
          <ContactCard
            key={index}
            contact={contact}
            onClick={() => setSelectedContact(contact)}
          />
        ))}
      </div>
    </div>
  );
}
