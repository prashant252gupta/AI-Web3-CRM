'use client';
import './globals.css';
import { WalletProvider } from '@/context/WalletContext';
import Sidebar from '@/components/Sidebar';
import ConnectWalletButton from '@/components/ConnectWalletButton';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <WalletProvider>
          <Sidebar />
          <main className="flex-1 flex flex-col">
            <header className="p-4 border-b flex justify-end">
              <ConnectWalletButton />
            </header>
            <div className="p-6 overflow-auto flex-1">{children}</div>
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
