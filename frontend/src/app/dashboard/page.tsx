'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCard from '@/components/SummaryCard';
import StageBarChart from '@/components/StageBarChart';
import StatusPieChart from '@/components/StatusPieChart';

interface Contact { _id: string; }
interface Deal {
  _id: string;
  status: string;
  value: number;
  stage: string;
}

export default function DashboardPage() {
  const [contactsCount, setContactsCount] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    // Fetch contacts count
    axios
      .get<Contact[]>('http://localhost:5000/api/contacts')
      .then(res => setContactsCount(res.data.length))
      .catch(console.error);

    // Fetch deals
    axios
      .get<Deal[]>('http://localhost:5000/api/deals')
      .then(res => setDeals(res.data))
      .catch(console.error);
  }, []);

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
