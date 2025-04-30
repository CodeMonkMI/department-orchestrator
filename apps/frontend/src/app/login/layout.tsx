"use client";
import { useAuthContext } from "@/store/auth/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { isAuthenticated, isHydrated, user } = useAuthContext();
  if (isHydrated && isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  return <>{children}</>;
};

export default Layout;
