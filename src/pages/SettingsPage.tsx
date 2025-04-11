import React from "react";
import { PageHeader } from "@/components/ui/page-header";

const SettingsPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Settings"
        breadcrumbs={[{ title: "Platform", href: "/" }, { title: "Settings" }]}
      />{" "}
      <main className="flex-1 p-6">

      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <p>Welcome to your Settings!</p>
      </main>
    </div>
  );
};

export default SettingsPage;
