import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* Components */
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Dealz",
  description: "Bridging the gap between buyers and sellers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Nav />
        {children}</body>
    </html>
  );
}
