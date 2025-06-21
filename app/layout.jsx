'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen font-sans">
        <header className="bg-red-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Blood Donation Portal</h1>
            <nav className="space-x-4">
              {!isAdmin ? (
                <Link href="/admin" className="hover:underline">Admin</Link>
              ) : (
                <Link href="/" className="hover:underline">Search</Link>
              )}
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
