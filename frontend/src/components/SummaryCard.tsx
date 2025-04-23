'use client';
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: number | string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-6 flex-1">
    <h4 className="text-sm text-gray-500 mb-2">{title}</h4>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default SummaryCard;
