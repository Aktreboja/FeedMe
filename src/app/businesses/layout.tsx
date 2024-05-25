'use client';
import Navbar from '@/Components/Navbar';
import { APIProvider } from '@vis.gl/react-google-maps';
import Footer from '@/Components/UI/Footer';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow overflow-y-auto mt-20 p-4">{children}</main>
        <Footer />
      </div>
    </APIProvider>
  );
}
