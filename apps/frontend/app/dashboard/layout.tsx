import {
  DashboardSidebar,
  DashboardHeader,
} from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="router-bg min-h-screen">
      <DashboardSidebar />
      <div className="lg:ml-64">
        <DashboardHeader />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
