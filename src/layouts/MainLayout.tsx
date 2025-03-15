import React, { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="bg-background text-foreground">
      <Header />
      {children}
      <Toaster />
    </Layout>
  );
};
