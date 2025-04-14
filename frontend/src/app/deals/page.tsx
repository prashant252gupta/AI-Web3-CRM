'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    status: '',
    value: '',
    stage: '',
  });

  const [editingDeal, setEditingDeal] = useState(null);

  // Fetch deals
  useEffect(() => {
    axios.get('http://localhost:5000/api/deals')
      .then(res => setDeals(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: any) => {
    if (editingDeal) {
      setEditingDeal({ ...editingDeal, [e.target.name]: e.target.value });
    } else {
      setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/deals', newDeal);
      setDeals([...deals, res.data]);
      setShowModal(false);
      setNewDeal({ title: '', status: '', value: '', stage: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/deals/${editingDeal._id}`, editingDeal);
      const updated = res.data;

      const updatedDeals = deals.map(deal =>
        deal._id === updated._id ? updated : deal
      );

      setDeals(updatedDeals);
      setEditingDeal(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      try {
        await axios.delete(`http://localhost:5000/api/deals/${id}`);
        setDeals(deals.filter(deal => deal._id !== id));
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

      {/* New Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">New Deal</h3>

            <input
              name="title"
              placeholder="Title"
              value={newDeal.title}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="status"
              value={newDeal.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <input
              name="value"
              placeholder="Value"
              value={newDeal.value}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="stage"
              value={newDeal.stage}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Stage</option>
              <option value="Initial Contact">Initial Contact</option>
              <option value="Discovery">Discovery</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed">Closed</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
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
      )}

      {/* Edit Deal Modal */}
      {editingDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Deal</h3>

            <input
              name="title"
              placeholder="Title"
              value={editingDeal.title}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="status"
              value={editingDeal.status}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <input
              name="value"
              placeholder="Value"
              value={editingDeal.value}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="stage"
              value={editingDeal.stage}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">Select Stage</option>
              <option value="Initial Contact">Initial Contact</option>
              <option value="Discovery">Discovery</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed">Closed</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingDeal(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-lg transition relative"
          >
            <h3 className="text-lg font-semibold mb-1">{deal.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Stage: {deal.stage}</p>
            <p className="text-sm text-gray-600 mb-1">Status: {deal.status}</p>
            <p className="text-md font-bold text-green-700">{deal.value}</p>

            {/* Edit Button */}
            <button
              onClick={() => setEditingDeal(deal)}
              className="absolute top-2 right-14 text-xs px-2 py-1 bg-gray-200 rounded"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(deal._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xs px-2 py-1 bg-gray-100 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
