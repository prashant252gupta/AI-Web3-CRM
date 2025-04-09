'use client';
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-black text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Web3 CRM</h1>
      <nav className="space-y-4">
        <Link href="/">Dashboard</Link>
        <Link href="/contacts">Contacts</Link>
        <Link href="/deals">Deals</Link>
        <Link href="/inbox">Inbox</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
