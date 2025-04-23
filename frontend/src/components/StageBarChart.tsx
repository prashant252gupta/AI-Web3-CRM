'use client';
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface DataPoint { stage: string; count: number; }

interface StageBarChartProps {
  data: DataPoint[];
}

const StageBarChart: React.FC<StageBarChartProps> = ({ data }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h4 className="text-lg font-semibold mb-4">Deals by Stage</h4>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="stage" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default StageBarChart;
