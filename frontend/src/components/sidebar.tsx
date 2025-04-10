'use client';
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Web3 CRM</h1>
      <nav className="space-y-4">
        <Link href="/" className="block">Dashboard</Link>
        <Link href="/contacts" className="block">Contacts</Link>
        <Link href="/deals" className="block">Deals</Link>
        <Link href="/inbox" className="block">Inbox</Link>
        <Link href="/analytics" className="block">Analytics</Link>
        <Link href="/login" className="block">Login</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
