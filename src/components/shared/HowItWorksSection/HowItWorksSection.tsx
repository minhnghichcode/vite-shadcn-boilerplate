import type React from "react"
import { FileText, Globe, Settings } from "lucide-react"

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our platform makes it easy to deploy powerful AI chatbots across your organization
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <StepCard
            icon={<FileText className="w-8 h-8 text-primary" />}
            title="1. Connect Your Data"
            description="Upload documents, connect to URLs, or integrate with your existing databases"
          />
          <StepCard
            icon={<Settings className="w-8 h-8 text-primary" />}
            title="2. Configure Your Chatbot"
            description="Customize LLM parameters, set access permissions, and assign data sources"
          />
          <StepCard
            icon={<Globe className="w-8 h-8 text-primary" />}
            title="3. Deploy & Analyze"
            description="Launch your chatbot and gain insights through our comprehensive analytics dashboard"
          />
        </div>
      </div>
    </section>
  )
}

type StepCardProps = { icon: React.ReactNode; title: string; description: string }

function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default HowItWorksSection
