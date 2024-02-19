import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";

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
      <body className="lg:flex m-0 lg:p-3">
        <div className="hidden lg:block h-[calc(100vh-30px)]">
          <Sidebar />
        </div>
        {children}
        <BottomBar />
      </body>
    </html>
  );
}
