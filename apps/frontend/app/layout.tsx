import type { Metadata } from "next";
import { Navbar } from "../src/features/navbar/components/Navbar";
import { Provider } from "../src/shared/ui/components/provider";
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
