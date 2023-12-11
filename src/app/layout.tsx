'use client';

import './globals.css';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='hu'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Simonyimail</title>
        <meta name='description' content='E-mail sablon készítő és levélküldő munkafolyam webalkalmazás' />
      </head>
      <SessionProvider session={null}>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
