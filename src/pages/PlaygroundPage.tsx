import React from "react";
import { PageHeader } from "@/components/ui/page-header";

const PlaygroudPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Playgroud"
        breadcrumbs={[{ title: "Platform", href: "/" }, { title: "Playgroud" }]}
      />{" "}
      <main className="flex-1 p-6">

      <h1 className="text-3xl font-bold mb-4">Playgroud</h1>
      <p>Welcome to your Playgroud!</p>
      </main>
    </div>
  );
};

export default PlaygroudPage;
