import type React from "react"
import { BarChartIcon as ChartBarIcon, Database, MessageSquare, Shield } from "lucide-react"

function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful RAG Platform Features</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our comprehensive platform enables organizations to create, customize, and manage AI-powered chatbots with
            advanced retrieval capabilities.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureDetailCard
            icon={<MessageSquare className="w-6 h-6 text-primary" />}
            title="Intelligent Chatbots"
            description="Create customized AI assistants with RAG capabilities for each department"
          />
          <FeatureDetailCard
            icon={<Database className="w-6 h-6 text-primary" />}
            title="Data Integration"
            description="Connect to multiple data sources including documents, URLs, and databases"
          />
          <FeatureDetailCard
            icon={<Shield className="w-6 h-6 text-primary" />}
            title="Enterprise Security"
            description="End-to-end encryption with role-based access control"
          />
          <FeatureDetailCard
            icon={<ChartBarIcon className="w-6 h-6 text-primary" />}
            title="Advanced Analytics"
            description="Comprehensive insights into chatbot performance and usage"
          />
        </div>
      </div>
    </section>
  )
}

type FeatureDetailCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureDetailCard({ icon, title, description }: FeatureDetailCardProps) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="feature-icon mb-4 p-3 rounded-full bg-primary/10 w-fit">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default FeaturesSection
