'use client';
import React, { useContext } from 'react';
import { WalletContext } from '@/context/WalletContext';

export default function ConnectWalletButton() {
  const { address, connect, disconnect } = useContext(WalletContext);

  if (address) {
    const short = `${address.slice(0,6)}…${address.slice(-4)}`;
    return (
      <button
        onClick={disconnect}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        {short}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Connect Wallet
    </button>
  );
}
