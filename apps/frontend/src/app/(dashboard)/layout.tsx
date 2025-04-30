"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useAuthContext } from "@/store/auth/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { isAuthenticated, isHydrated, user } = useAuthContext();
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex w-full">
        <Sidebar />

        <div className="flex-1 min-h-screen flex flex-col ml-[80px] lg:ml-[250px]">
          <Header />

          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
