import type React from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

function CTASection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Knowledge Management?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Join leading organizations that use our platform to make their information accessible and actionable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            to="#pricing"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
