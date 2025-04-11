import type React from "react"

function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <StatCard value="99.9%" label="Uptime Guaranteed" />
          <StatCard value="500+" label="Enterprise Clients" />
          <StatCard value="10M+" label="Documents Processed" />
          <StatCard value="50+" label="Data Integrations" />
        </div>
      </div>
    </section>
  )
}

type StatCardProps = { value: string; label: string }

function StatCard({ value, label }: StatCardProps) {
  return (
    <div>
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}

export default StatsSection
