import type { Metadata } from "next";
import { DashboardClient } from "@/components/auth/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard | Big Film Fund",
  description: "Your Big Film Fund account dashboard.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
