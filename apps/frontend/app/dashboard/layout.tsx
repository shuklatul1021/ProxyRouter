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
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:ml-64">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
