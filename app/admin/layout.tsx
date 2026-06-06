import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — AI Wedding Show",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#020209" }}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-auto" style={{ minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
