import type { Metadata } from "next";
import { Provider } from "../src/components/ui/provider";
import { Navbar } from "../src/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleaning Service",
  description: "Cleaning service dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
