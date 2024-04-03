"use client"
import { APIProvider } from "@vis.gl/react-google-maps";


  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
            <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
                {children}
            </APIProvider>
        </body>
        
      </html>
    );
  }
  