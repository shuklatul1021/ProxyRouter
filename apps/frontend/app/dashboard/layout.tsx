"use client";
import { getUserInfo, UserInterface } from "@/api/auth/auth";
import {
  DashboardSidebar,
  DashboardHeader,
} from "@/components/dashboard/sidebar";
import { BACKEDNURL } from "@/utils/url";
import { useEffect, useState } from "react";
import { UserProvider } from "../providers/UserProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInterface | null>(null);

  const fetchUserInfo = async () => {
    const info = await getUserInfo();
    if (info.success) {
      setUserInfo(info.user || null);
    } else {
      setUserInfo(null);
    }
  };

  if (userInfo) {
    console.log("User Info: ", userInfo);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="router-bg min-h-screen">
      <DashboardSidebar user={userInfo || null} />
      <div className="lg:ml-64">
        <DashboardHeader user={userInfo || null} />
        <main className="p-4 sm:p-6">
          <UserProvider initialUser={userInfo || null}>{children}</UserProvider>
        </main>
      </div>
    </div>
  );
}
