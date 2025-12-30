import "./globals.css";

export const metadata = {
  title: "User Directory",
  description: "Small Next.js demo project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-white shadow p-4 font-bold text-lg">
          User Directory
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
