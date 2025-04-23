'use client';
import React from 'react';

interface Contact {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tags?: string[];
}

interface ContactCardProps {
  contact: Contact;
  onClick?: () => void;      // view details
  onEdit?: (c: Contact) => void;
  onDelete?: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onClick,
  onEdit,
  onDelete
}) => (
  <div className="relative bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-lg transition">
    <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
      <h3 className="text-lg font-semibold">{contact.name}</h3>
      {contact.email && <p className="text-sm text-gray-600">{contact.email}</p>}
      {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
      <div className="flex flex-wrap gap-1 mt-2">
        {contact.tags?.map((tag, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>

    {onEdit && (
      <button
        onClick={() => onEdit(contact)}
        className="absolute top-2 right-12 text-xs px-2 py-1 bg-gray-200 rounded"
      >
        Edit
      </button>
    )}
    {onDelete && (
      <button
        onClick={() => onDelete(contact._id)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xs px-2 py-1 bg-gray-100 rounded"
      >
        Delete
      </button>
    )}
  </div>
);

export default ContactCard;
