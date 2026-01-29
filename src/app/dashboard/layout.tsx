import { DashboardSidebar } from "@/components/application/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/application/dashboard/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
