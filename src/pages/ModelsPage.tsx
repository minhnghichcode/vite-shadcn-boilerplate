import React from "react";
import { PageHeader } from "@/components/ui/page-header";

const ModelPagePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="ModelPage"
        breadcrumbs={[{ title: "Platform", href: "/" }, { title: "ModelPage" }]}
      />{" "}
      <main className="flex-1 p-6">

      <h1 className="text-3xl font-bold mb-4">ModelPage</h1>
      <p>Welcome to your ModelPage!</p>
      </main>
    </div>
  );
};

export default ModelPagePage;
