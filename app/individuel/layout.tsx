import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Rugby Match Monitor - Individuel",
  description: "Mode individuel du monitoring de match de rugby",
};

export default function IndividuelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
