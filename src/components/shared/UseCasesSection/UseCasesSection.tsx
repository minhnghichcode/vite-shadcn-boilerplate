import type React from "react"
import { Database, Globe, Shield, Users, Zap } from "lucide-react"

function UseCasesSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Use Cases</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our platform adapts to various business needs across departments
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <UseCaseCard
            icon={<Users className="w-6 h-6 text-primary" />}
            title="Customer Support"
            description="Reduce response times and improve satisfaction with AI-powered support chatbots that access your knowledge base"
          />
          <UseCaseCard
            icon={<Database className="w-6 h-6 text-primary" />}
            title="Internal Knowledge Management"
            description="Help employees quickly find information across internal documents, wikis, and databases"
          />
          <UseCaseCard
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Compliance & Legal"
            description="Ensure accurate responses based on the latest regulatory documents and legal guidelines"
          />
          <UseCaseCard
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="Sales Enablement"
            description="Equip your sales team with instant access to product information, pricing, and competitive intelligence"
          />
          <UseCaseCard
            icon={<Users className="w-6 h-6 text-primary" />}
            title="HR & Onboarding"
            description="Streamline employee onboarding and answer common HR questions automatically"
          />
          <UseCaseCard
            icon={<Globe className="w-6 h-6 text-primary" />}
            title="Research & Development"
            description="Accelerate innovation by providing researchers with AI-assisted access to relevant documents and data"
          />
        </div>
      </div>
    </section>
  )
}

type UseCaseCardProps = { icon: React.ReactNode; title: string; description: string }

function UseCaseCard({ icon, title, description }: UseCaseCardProps) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="feature-icon mb-4 p-3 rounded-full bg-primary/10 w-fit">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default UseCasesSection
