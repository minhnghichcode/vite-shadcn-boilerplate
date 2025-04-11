import React from "react";
import { PageHeader } from "@/components/ui/page-header";

const KnowlegedBasePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="KnowlegedBase"
        breadcrumbs={[{ title: "Platform", href: "/" }, { title: "KnowlegedBase" }]}
      />{" "}
      <main className="flex-1 p-6">

      <h1 className="text-3xl font-bold mb-4">Knowleged Base</h1>
      <p>Welcome to your Knowleged Base!</p>
      </main>
    </div>
  );
};

export default KnowlegedBasePage;
