'use client';
import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

interface DataPoint { name: string; value: number; }

interface StatusPieChartProps {
  data: DataPoint[];
}

const COLORS = ['#34d399', '#f87171', '#60a5fa']; // green, red, blue

const StatusPieChart: React.FC<StatusPieChartProps> = ({ data }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h4 className="text-lg font-semibold mb-4">Deals by Status</h4>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default StatusPieChart;
