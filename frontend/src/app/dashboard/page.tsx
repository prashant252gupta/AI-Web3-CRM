'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import SummaryCard from '@/components/SummaryCard';
import StageBarChart from '@/components/StageBarChart';
import StatusPieChart from '@/components/StatusPieChart';

interface Contact { _id: string; }

interface Deal {
  _id:    string;
  status: string;
  value:  number;
  stage:  string;
}

export default function DashboardPage() {
  const { token } = useAuth();
  const [contactsCount, setContactsCount] = useState(0);
  const [deals, setDeals]                 = useState<Deal[]>([]);

  useEffect(() => {
    if (!token) return; // wait for login

    // Fetch contacts count
    api.get<Contact[]>('/contacts')
      .then(res => setContactsCount(res.data.length))
      .catch(err => {
        console.error('Error fetching contacts count:', err.response?.data || err);
        alert('Failed to load contacts.');
      });

    // Fetch deals
    api.get<Deal[]>('/deals')
      .then(res => setDeals(res.data))
      .catch(err => {
        console.error('Error fetching deals:', err.response?.data || err);
        alert('Failed to load deals.');
      });
  }, [token]);

  // Compute metrics
  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  // Status distribution
  const statusData = ['In Progress', 'Won', 'Lost'].map(name => ({
    name,
    value: deals.filter(d => d.status === name).length,
  }));

  // Stage distribution
  const stageCounts: Record<string, number> = {};
  deals.forEach(d => {
    stageCounts[d.stage] = (stageCounts[d.stage] || 0) + 1;
  });
  const stageData = Object.entries(stageCounts).map(([stage, count]) => ({
    stage,
    count,
  }));

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SummaryCard title="Total Contacts" value={contactsCount} />
        <SummaryCard title="Total Deals" value={totalDeals} />
        <SummaryCard title="Total Value" value={`$${totalValue.toLocaleString()}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StageBarChart data={stageData} />
        <StatusPieChart data={statusData} />
      </div>
    </div>
  );
}
