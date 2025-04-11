import React from "react";
import { PageHeader } from "@/components/ui/page-header";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="dashboard"
        breadcrumbs={[{ title: "Report", href: "/" }, { title: "dashboard" }]}
      />{" "}
      <main className="flex-1 p-6">

      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
};

export default DashboardPage;
