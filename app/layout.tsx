import Layout from "@/components/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/provider/authProvider";
import EditModal from "@/components/modals/EditModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Generated by Rishav Nandi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <SessionProvider>
          <Toaster />
          <EditModal />
          <RegisterModal />
          <LoginModal />
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
