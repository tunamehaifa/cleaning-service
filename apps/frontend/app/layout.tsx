import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matalenu",
  description: "Cleaning service dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
