'use client';
import React, { useState } from 'react';

type ContactDetailModalProps = {
  contact: any;
  onClose: () => void;
};

export default function ContactDetailModal({
  contact,
  onClose,
}: ContactDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
        <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Company:</strong> {contact.company}</p>
        <p><strong>Tags:</strong> {contact.tags?.join(', ')}</p>
        <p><strong>Notes:</strong> {contact.notes}</p>
        <p><strong>Created:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="text-white bg-gray-600 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
