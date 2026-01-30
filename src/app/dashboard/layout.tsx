"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/application/dashboard/dashboard-sidebar";
import { getAuthToken } from "@/utils/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary lg:flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 mx-auto max-w-container w-full px-4 py-6 md:px-8 md:py-8">
            {children}
        </main>
      </div>
    </div>
  );
}
