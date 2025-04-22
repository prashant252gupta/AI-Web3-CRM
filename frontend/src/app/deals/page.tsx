'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewDealModal from '@/components/NewDealModal';
import EditDealModal from '@/components/EditDealModal';
import DealCard from '@/components/DealCard';

interface Deal {
  _id: string;
  title: string;
  status: string;
  value: string;
  stage: string;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDeal, setNewDeal] = useState<Deal>({
    _id: '',
    title: '',
    status: '',
    value: '',
    stage: '',
  });

  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/deals')
      .then(res => setDeals(res.data))
      .catch(err => console.error(err));
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
    try {
      // Omit _id and convert value to number
      const { _id, ...dealData } = newDeal;
      const payload = {
        ...dealData,
        value: Number(dealData.value),
      };

      const res = await axios.post('http://localhost:5000/api/deals', payload);
      setDeals([...deals, res.data]);
      setShowModal(false);
      setNewDeal({ _id: '', title: '', status: '', value: '', stage: '' });
    } catch (err) {
      console.error('Failed to submit deal:', err);
    }
  };

  const handleUpdate = async () => {
    if (!editingDeal) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/deals/${editingDeal._id}`,
        editingDeal
      );
      const updated = res.data;
      setDeals(deals.map(d => (d._id === updated._id ? updated : d)));
      setEditingDeal(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      try {
        await axios.delete(`http://localhost:5000/api/deals/${id}`);
        setDeals(deals.filter(d => d._id !== id));
      } catch (err) {
        console.error('Failed to delete deal:', err);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Deals</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New Deal
        </button>
      </div>

      {showModal && (
        <NewDealModal
          newDeal={newDeal}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {editingDeal && (
        <EditDealModal
          editingDeal={editingDeal}
          onChange={handleChange}
          onUpdate={handleUpdate}
          onCancel={() => setEditingDeal(null)}
        />
      )}

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
