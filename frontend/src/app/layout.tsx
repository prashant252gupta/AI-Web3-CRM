'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { WalletProvider }        from '@/context/WalletContext';
import Sidebar                   from '@/components/Sidebar';
import ConnectWalletButton       from '@/components/ConnectWalletButton';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router    = useRouter();
  const pathname  = usePathname();

  const publicPaths = ['/login'];
  const isPublic    = publicPaths.includes(pathname);
  const isAuth      = Boolean(token);

  // track mount so we don’t mismatch SSR vs client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // perform redirects only after mount
  useEffect(() => {
    if (!mounted) return;
    if (!isAuth && !isPublic) {
      router.push('/login');
    } else if (isAuth && isPublic) {
      router.push('/');
    }
  }, [mounted, isAuth, isPublic, router]);

  // before hydration complete, render children to avoid mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  // block rendering on unauthorized protected route
  if (!isAuth && !isPublic) {
    return null;
  }

  // block rendering on auth-ed public route
  if (isAuth && isPublic) {
    return null;
  }

  // otherwise, render your app
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <AuthProvider>
          <WalletProvider>
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <header className="p-4 border-b flex justify-end">
                <ConnectWalletButton />
              </header>

              <AuthGuard>
                <div className="p-6 overflow-auto flex-1">
                  {children}
                </div>
              </AuthGuard>
            </main>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
