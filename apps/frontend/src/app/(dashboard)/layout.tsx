"use client";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/store/auth/AuthProvider";
import { useIsSidebarOpen } from "@/store/preference/PreferenceStore";
import { useRouter } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const collapsed: boolean = useIsSidebarOpen();
  const { isAuthenticated, isHydrated, user } = useAuthContext();
  if (router && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex w-full">
        <Sidebar />

        <div
          className={cn("flex-1 min-h-screen flex flex-col ml-[80px] ", {
            " lg:ml-[250px]": !collapsed,
          })}
        >
          <Header />

          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-[cal(80rem-170px)] mx-auto">
              <div>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
