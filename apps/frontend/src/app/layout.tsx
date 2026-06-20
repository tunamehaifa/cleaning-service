import type { Metadata } from "next";
import { Navbar } from "../features/navbar/components/Navbar";
import { Provider } from "../shared/ui/components/provider";
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
