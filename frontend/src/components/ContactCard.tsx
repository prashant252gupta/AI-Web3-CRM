'use client';
export default function ContactCard({
  contact,
  onClick,
}: {
  contact: {
    name: string;
    wallet: string;
    tags: string[];
  };
  onClick: () => void;
}) {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{contact.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{contact.wallet}</p>
      <div className="flex flex-wrap gap-2">
        {contact.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
