

export const metadata = {
  title: "FeedMe | Login",
  description: "Sign up for FeedMe to create a personalized profile for your Yelp interests.",
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
