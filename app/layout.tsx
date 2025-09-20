import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rugby Match Monitor",
  description: "Application de monitoring de match de rugby avec export CSV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
