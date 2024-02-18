import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Layout from "./components/Layout";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savvy",
  description: "An Expense Tracker App",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
