'use client';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import NewDealModal from '@/components/NewDealModal';
import EditDealModal from '@/components/EditDealModal';
import DealCard from '@/components/DealCard';

interface ContactOption { _id: string; name: string; }
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
    _id:'', title:'', status:'', value:'', stage:'', contactId:''
  });
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  // search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStage, setFilterStage] = useState('');

  useEffect(() => {
    axios.get<ContactOption[]>('http://localhost:5000/api/contacts')
      .then(res => setContacts(res.data))
      .catch(console.error);
    axios.get<Deal[]>('http://localhost:5000/api/deals')
      .then(res => setDeals(res.data))
      .catch(console.error);
  }, []);

  // filtered list
  const filteredDeals = useMemo(() => {
    return deals.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? d.status === filterStatus : true;
      const matchesStage  = filterStage  ? d.stage === filterStage   : true;
      return matchesSearch && matchesStatus && matchesStage;
    });
  }, [deals, searchTerm, filterStatus, filterStage]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (editingDeal) {
      setEditingDeal({ ...editingDeal, [name]: value });
    } else {
      setNewDeal({ ...newDeal, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const { _id, ...data } = newDeal;
    const payload: any = {
      title: data.title,
      status: data.status,
      value: Number(data.value),
      stage: data.stage,
      ...(data.contactId && { contactId: data.contactId })
    };
    try {
      const res = await axios.post<Deal>('http://localhost:5000/api/deals', payload);
      setDeals(d => [...d, res.data]);
      setShowModal(false);
      setNewDeal({ _id:'', title:'', status:'', value:'', stage:'', contactId:'' });
    } catch (err) {
      console.error(err);
      alert('Error creating deal');
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
      const res = await axios.put<Deal>(
        `http://localhost:5000/api/deals/${editingDeal._id}`,
        payload
      );
      setDeals(d => d.map(x => x._id === res.data._id ? res.data : x));
      setEditingDeal(null);
    } catch (err) {
      console.error(err);
      alert('Error updating deal');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this deal?')) {
      try {
        await axios.delete(`http://localhost:5000/api/deals/${id}`);
        setDeals(d => d.filter(x => x._id !== id));
      } catch {
        alert('Error deleting deal');
      }
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
