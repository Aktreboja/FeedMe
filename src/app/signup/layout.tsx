
export const metadata = {
  title: "FeedMe | Sign up",
  description: "Sign up for FeedMe to start collecting Locations to share",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
