'use client';
import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import NewDealModal from '@/components/NewDealModal';
import EditDealModal from '@/components/EditDealModal';
import DealCard from '@/components/DealCard';

interface ContactOption {
  _id: string;
  name: string;
}

interface Deal {
  _id:       string;
  title:     string;
  status:    string;
  value:     number | string;
  stage:     string;
  contactId?: string | { _id: string; name: string };
}

export default function DealsPage() {
  const { token } = useAuth();

  const [deals, setDeals]           = useState<Deal[]>([]);
  const [contacts, setContacts]     = useState<ContactOption[]>([]);
  const [showModal, setShowModal]   = useState(false);
  const [newDeal, setNewDeal]       = useState<Deal>({
    _id: '', title: '', status: '', value: '', stage: '', contactId: ''
  });
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  // Filters
  const [searchTerm, setSearchTerm]     = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStage, setFilterStage]   = useState('');

  // Fetch contacts & deals once we have a token
  useEffect(() => {
    if (!token) return;

    api.get<ContactOption[]>('/contacts')
    .then(res => setContacts(res.data))
    .catch(err => {
      const status = err.response?.status;
      const data   = err.response?.data;
      console.error('Fetch contacts error', status, data || err);
      alert(`Failed to load contacts (${status}): ${JSON.stringify(data)}`);
    });

    api.get<Deal[]>('/deals')
      .then(res => setDeals(res.data))
      .catch(err => {
        const status = err.response?.status;
        const data   = err.response?.data;
        console.error('Fetch deals error', status, data || err);
        alert(`Failed to load deals (${status}): ${JSON.stringify(data)}`);
      });
  }, [token]);

  // Filter logic
  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      const matchesSearch = d.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? d.status === filterStatus : true;
      const matchesStage  = filterStage  ? d.stage   === filterStage  : true;
      return matchesSearch && matchesStatus && matchesStage;
    });
  }, [deals, searchTerm, filterStatus, filterStage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingDeal) {
      setEditingDeal({ ...editingDeal, [name]: value });
    } else {
      setNewDeal({ ...newDeal, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const { _id, value, ...rest } = newDeal;
    const payload: any = {
      ...rest,
      value: Number(value),
      ...(newDeal.contactId && { contactId: newDeal.contactId })
    };

    try {
      const res = await api.post<Deal>('/deals', payload);
      setDeals(d => [...d, res.data]);
      setShowModal(false);
      setNewDeal({ _id:'', title:'', status:'', value:'', stage:'', contactId:'' });
    } catch (err: any) {
      console.error('Create deal failed:', err.response || err);
      alert(
        `Error creating deal: ` + 
        `${err.response?.status} ${err.response?.data?.message || err.message}`
      );
    }
  };

  const handleUpdate = async () => {
    if (!editingDeal) return;
    const payload: any = {
      title: editingDeal.title,
      status: editingDeal.status,
      value: Number(editingDeal.value),
      stage: editingDeal.stage,
      ...(editingDeal.contactId && {
        contactId: typeof editingDeal.contactId === 'object'
          ? editingDeal.contactId._id
          : editingDeal.contactId
      })
    };

    try {
      const res = await api.put<Deal>(`/deals/${editingDeal._id}`, payload);
      setDeals(d => d.map(x => x._id === res.data._id ? res.data : x));
      setEditingDeal(null);
    } catch (err: any) {
      console.error('Update deal failed:', err.response || err);
      alert(
        `Error updating deal: ` +
        `${err.response?.status} ${err.response?.data?.message || err.message}`
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this deal?')) return;
    try {
      await api.delete(`/deals/${id}`);
      setDeals(d => d.filter(x => x._id !== id));
    } catch (err: any) {
      console.error('Delete deal failed:', err.response || err);
      alert(
        `Error deleting deal: ` +
        `${err.response?.status} ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Deals</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Deal
        </button>
      </div>

      {/* Filter inputs */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by title…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option>In Progress</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
        <select
          value={filterStage}
          onChange={e => setFilterStage(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Stages</option>
          <option>Initial Contact</option>
          <option>Discovery</option>
          <option>Proposal</option>
          <option>Negotiation</option>
          <option>Closed</option>
        </select>
      </div>

      {/* Modals */}
      {showModal && (
        <NewDealModal
          contacts={contacts}
          newDeal={newDeal}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
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
        {filteredDeals.map(deal => (
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
