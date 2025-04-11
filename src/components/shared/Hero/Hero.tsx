import type React from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, Check, BarChartIcon as ChartBarIcon, Database, MessageSquare } from "lucide-react"

function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative hero-container">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="badge badge-primary mb-6 mx-auto w-fit px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            The Ultimate RAG Platform
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              AI-Powered{" "}
              <span className="gradient-text">
                RAG Chatbots
              </span>{" "}
              for Your Enterprise
            </h1>
            <p className="hero-subtitle text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create, customize, and manage intelligent chatbots with Retrieval Augmented Generation across your
              organization. Connect to your data sources and deliver accurate, context-aware responses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dashboard"
                className="primary-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
              >
                Get Started Free
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="#pricing"
                className="secondary-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
              >
                View Pricing
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <FeatureCard
                icon={<MessageSquare className="w-10 h-10 feature-icon mb-3 text-primary" />}
                title="Multi-Tenant Chatbots"
                description="Deploy customized chatbots for each department"
              />
              <FeatureCard
                icon={<Database className="w-10 h-10 feature-icon mb-3 text-primary" />}
                title="Data Integration"
                description="Connect to documents, URLs, and databases"
              />
              <FeatureCard
                icon={<ChartBarIcon className="w-10 h-10 feature-icon mb-3 text-primary" />}
                title="Advanced Analytics"
                description="Track performance and user satisfaction"
              />
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type FeatureCardProps = { icon: React.ReactNode; title: string; description: string }

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-5 bg-card rounded-xl shadow-sm">
      {icon}
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Hero
