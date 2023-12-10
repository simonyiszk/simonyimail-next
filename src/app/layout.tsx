'use client';

import './globals.css';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='hu'>
      <SessionProvider session={null}>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
