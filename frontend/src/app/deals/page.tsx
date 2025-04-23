'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewDealModal from '@/components/NewDealModal';
import EditDealModal from '@/components/EditDealModal';
import DealCard from '@/components/DealCard';

interface ContactOption {
  _id: string;
  name: string;
}

interface Deal {
  _id:     string;
  title:   string;
  status:  string;
  value:   string;
  stage:   string;
  contactId?: string | { _id: string; name: string };
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contacts, setContacts] = useState<ContactOption[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDeal, setNewDeal] = useState<Deal>({
    _id:        '',
    title:      '',
    status:     '',
    value:      '',
    stage:      '',
    contactId:  '',
  });
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  useEffect(() => {
    // load contacts and deals
    axios.get<ContactOption[]>('http://localhost:5000/api/contacts')
      .then(res => setContacts(res.data))
      .catch(console.error);

    axios.get<Deal[]>('http://localhost:5000/api/deals')
      .then(res => setDeals(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (editingDeal) {
      setEditingDeal({ ...editingDeal, [name]: value });
    } else {
      setNewDeal({ ...newDeal, [name]: value });
    }
  };

  const handleSubmit = async () => {
    // strip _id, prepare payload
    const { _id, ...dealData } = newDeal;
    const payload: any = {
      title:  dealData.title,
      status: dealData.status,
      value:  Number(dealData.value),
      stage:  dealData.stage,
    };
    if (dealData.contactId) {
      payload.contactId = dealData.contactId;
    }

    console.log('Submitting deal payload:', payload);

    try {
      const res = await axios.post<Deal>(
        'http://localhost:5000/api/deals',
        payload
      );
      setDeals([...deals, res.data]);
      setShowModal(false);
      setNewDeal({ _id:'', title:'', status:'', value:'', stage:'', contactId:'' });
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      console.error('Failed to submit deal:', msg);
      alert(`Error creating deal: ${msg}`);
    }
  };

  const handleUpdate = async () => {
    if (!editingDeal) return;

    // prepare payload
    const payload: any = {
      title:  editingDeal.title,
      status: editingDeal.status,
      value:  Number(editingDeal.value),
      stage:  editingDeal.stage,
    };
    if (editingDeal.contactId) {
      payload.contactId = typeof editingDeal.contactId === 'object'
        ? editingDeal.contactId._id
        : editingDeal.contactId;
    }

    console.log('Updating deal payload:', payload);

    try {
      const res = await axios.put<Deal>(
        `http://localhost:5000/api/deals/${editingDeal._id}`,
        payload
      );
      setDeals(deals.map(d => (d._id === res.data._id ? res.data : d)));
      setEditingDeal(null);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      console.error('Failed to update deal:', msg);
      alert(`Error updating deal: ${msg}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/deals/${id}`);
      setDeals(deals.filter(d => d._id !== id));
    } catch (err) {
      console.error('Failed to delete deal:', err);
      alert('Error deleting deal');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deals</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Deal
        </button>
      </div>

      {/* New Deal Modal */}
      {showModal && (
        <NewDealModal
          contacts={contacts}
          newDeal={newDeal}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Edit Deal Modal */}
      {editingDeal && (
        <EditDealModal
          contacts={contacts}
          editingDeal={editingDeal}
          onChange={handleChange}
          onUpdate={handleUpdate}
          onCancel={() => setEditingDeal(null)}
        />
      )}

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map(deal => (
          <DealCard
            key={deal._id}
            deal={deal}
            onEdit={setEditingDeal}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
