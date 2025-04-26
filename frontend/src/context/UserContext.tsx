'use client';
import React, { createContext, useContext } from 'react';
import { useAccount } from 'wagmi';

interface UserContextValue {
  address?: string;
}

const UserContext = createContext<UserContextValue>({});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  return (
    <UserContext.Provider value={{ address: isConnected ? address : undefined }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);