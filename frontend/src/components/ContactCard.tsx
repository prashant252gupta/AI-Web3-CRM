'use client';
import React, { useState } from 'react';

type ContactCardProps = {
  contact: any;
  onClick: () => void;
};

export default function ContactCard({ contact, onClick }: ContactCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold mb-1">{contact.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {contact.tags?.map((tag: string, idx: number) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
