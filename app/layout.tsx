import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "User Directory - Modern User Management",
  description: "A beautiful Next.js application for managing users with CRUD operations and smooth animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="lg:ml-[280px] transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
