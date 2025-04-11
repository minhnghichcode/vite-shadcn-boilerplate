import type React from "react"
import { Link } from "react-router-dom"
import { Check } from "lucide-react"

function PricingSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Choose the perfect plan for your organization's needs. Scale as you grow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Starter"
            price="$49"
            description="Perfect for small teams getting started with RAG"
            features={["1 Chatbot", "10,000 messages/month", "5 GB storage", "Basic analytics", "Email support"]}
            buttonText="Start Free Trial"
            buttonLink="/sign-up"
            highlighted={false}
          />
          <PricingCard
            title="Professional"
            price="$149"
            description="Ideal for growing businesses with multiple departments"
            features={[
              "5 Chatbots",
              "50,000 messages/month",
              "25 GB storage",
              "Advanced analytics",
              "Priority support",
              "Custom branding",
            ]}
            buttonText="Start Free Trial"
            buttonLink="/sign-up"
            highlighted={true}
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            description="For organizations with advanced needs and scale"
            features={[
              "Unlimited chatbots",
              "Custom message volume",
              "Unlimited storage",
              "Enterprise analytics",
              "24/7 dedicated support",
              "Custom integrations",
              "SLA guarantees",
            ]}
            buttonText="Contact Sales"
            buttonLink="/contact"
            highlighted={false}
          />
        </div>
      </div>
    </section>
  )
}

type PricingCardProps = {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  highlighted: boolean
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`p-8 rounded-xl shadow-lg flex flex-col h-full ${
        highlighted
          ? "bg-primary text-primary-foreground border-2 border-primary scale-105"
          : "bg-card border border-border"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-4xl font-extrabold">{price}</span>
          {price !== "Custom" && <span className="ml-1 text-sm">/month</span>}
        </div>
        <p className={`${highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{description}</p>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check
              className={`w-5 h-5 mr-2 flex-shrink-0 ${highlighted ? "text-primary-foreground" : "text-green-500"}`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={buttonLink}>
        <button
          className={`w-full py-2 px-4 rounded-md font-medium ${
            highlighted
              ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  )
}

export default PricingSection
