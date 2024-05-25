'use client';
import './globals.css';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Provider store={store}>{children}</Provider>
        </UserProvider>
      </body>
    </html>
  );
}
