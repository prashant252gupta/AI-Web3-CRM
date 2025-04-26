// src/context/WalletContext.tsx
'use client';

import React, { createContext, useState, useEffect } from 'react';
// Import Web3Provider instead of using BrowserProvider
import { ethers } from 'ethers';

interface WalletContextValue {
  address: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const WalletContext = createContext<WalletContextValue>({
  address: '',
  connect: async () => {},
  disconnect: () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string>('');

  // On mount, see if already connected
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;
    // Use the Web3Provider from @ethersproject/providers under the hood
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    provider
      .getSigner()
      .getAddress()
      .then(setAddress)
      .catch(() => {});

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      setAddress(accounts[0] || '');
    });
  }, []);

  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    try {
      const accounts: string[] = await provider.send('eth_requestAccounts', []);
      setAddress(accounts[0]);
    } catch {
      // user rejected
    }
  };

  const disconnect = () => {
    setAddress('');
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};
